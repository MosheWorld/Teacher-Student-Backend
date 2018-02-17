import { AuthDal } from './../DAL/AuthDal';
import { UserInterface } from './../Interfaces/User.interface';
import { GoogleVerifier } from './../Integration/GoogleVerifier';
import { FacebookVerifier } from '../Integration/FacebookVerifier';
import { DoesUserExists } from './../Interfaces/DoesUserExists.interface';

export class AuthLogic {
    //#region Public Methods
    /**
     * Creates new user at database, also verify the token and validate provider to get the right details.
     * @param user User Model.
     */
    public async CreateNewUser(user: UserInterface): Promise<void> {
        let aDal = new AuthDal();

        let isValid: boolean = await this.IsTokenValid(user.provider, user.authToken);

        if (isValid === true) {
            aDal.CreateNewUser(user);
        } else {
            throw new Error("Given token is not valid, aborting.");
        }
    }

    /**
     * Validates whether user exists in database.
     * If the user exists, we will return json with data:
     * exist: {boolean} , role: {His role from database}
     * @param userExists User details to check.
     */
    public async DoesUserExistsByID(userExistsModel: DoesUserExists): Promise<any> {
        let aDal = new AuthDal();
        let isValid: boolean = await this.IsTokenValid(userExistsModel.provider, userExistsModel.token);

        if (isValid === false) {
            throw new Error("Given token is not valid, aborting.");
        }

        let prepairModelToReturn: any = {
            exist: false,
            role: 1
        }

        let userFromDatabase: any = await aDal.GetUserByID(userExistsModel.id);

        if (userFromDatabase === null) {
            return prepairModelToReturn;
        } else {
            // We found the user.
            prepairModelToReturn.exist = true;
            prepairModelToReturn.role = userFromDatabase.role;

            aDal.UpdateTokenToUserByID(userExistsModel.id, userExistsModel.token);

            return prepairModelToReturn;
        }
    }

    /**
     * Receives model from prodiver API as given on token and returns the specific ID of user.
     * @param token Given token.
     * @param provider Provider of the token.
     */
    public async GetUserIDByTokenFromProvider(token: string, provider: string): Promise<any> {
        switch (provider) {
            case "FACEBOOK":
                let fVerifier = new FacebookVerifier();
                let userDataByFacebook = await fVerifier.GetUserIDByToken(token);
                return userDataByFacebook.data.user_id;
            case "GOOGLE":
                let gVerifier = new GoogleVerifier();
                let userDataByGoogle = await gVerifier.GetUserIDByToken(token);
                return userDataByGoogle.sub;
            default:
                throw new Error("No provider found.");
        }
    }

    /**
     * Gets the current user by given ID ( NOT UUID ).
     * @param id 
     */
    public async GetUserByID(id: string): Promise<any> {
        let aDal = new AuthDal();

        return await aDal.GetUserByID(id);
    }
    //#endregion

    //#region Private Methods
    /**
     * Validates whether the token is valid according to provider and token given.
     * @param provider Provider of the token.
     * @param token Given token.
     */
    private async IsTokenValid(provider: string, token: string): Promise<boolean> {
        let isValid: boolean = false;

        switch (provider) {
            case "FACEBOOK":
                let fVerifier = new FacebookVerifier();
                isValid = await fVerifier.IsTokenValid(token);
                break;
            case "GOOGLE":
                let gVerifier = new GoogleVerifier();
                isValid = await gVerifier.IsTokenValid(token);
                break;
            default:
                throw new Error("No provider found.");
        }

        return isValid;
    }
    //#endregion
}