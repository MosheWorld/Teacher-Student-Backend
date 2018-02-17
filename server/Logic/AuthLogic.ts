import { AuthDal } from './../DAL/AuthDal';
import { UserInterface } from './../Interfaces/User.interface';
import { GoogleVerifier } from './../Integration/GoogleVerifier';
import { FacebookVerifier } from '../Integration/FacebookVerifier';

export class AuthLogic {
    //#region Public Methods
    /**
     * Creates new user at database, also verify the token and validate provider to get the right details.
     * @param user User Model.
     */
    public async CreateNewUser(user: UserInterface): Promise<void> {
        let aDal = new AuthDal();
        let isValid: boolean = false;

        switch (user.provider) {
            case "FACEBOOK":
                let fVerifier = new FacebookVerifier();
                isValid = await fVerifier.IsTokenValid(user.authToken);
                break;
            case "GOOGLE":
                let gVerifier = new GoogleVerifier();
                isValid = await gVerifier.IsTokenValid(user.authToken);
                break;
            default:
                throw new Error("No provider found.");
        }

        if (isValid === true) {
            aDal.CreateNewUser(user);
        } else {
            throw new Error("Given token is not valid, aborting.");
        }
    }
    //#endregion
}