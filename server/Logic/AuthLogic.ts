import { AuthDal } from './../DAL/AuthDal';
import { FacebookVerifier } from '../Integration/FacebookVerifier';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthLogic {
    //#region Public Methods
    /**
     * Creates new facebook user and validates whether the token is valid.
     * @param {FacebookUserInterface} user Facebook model.
     */
    public async CreateFacebookUser(user: FacebookUserInterface): Promise<void> {
        let aDal = new AuthDal();

        try {
            let fVerifier = new FacebookVerifier();
            let isValid = await fVerifier.IsTokenValid(user.authToken);

            if (isValid === true) {
                aDal.CreateFacebookUser(user);
            }
        }
        catch (ex) {
            throw Error(ex);
        }
    }
    //#endregion
}