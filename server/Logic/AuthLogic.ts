import { AuthDal } from './../DAL/AuthDal';
import { FacebookVerifier } from '../Integration/FacebookVerifier';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthLogic {
    //#region Public Methods
    public async CreateFacebookUser(user: FacebookUserInterface): Promise<void> {
        let aDal = new AuthDal();

        try {
            let fVerifier = new FacebookVerifier();
            let response = await fVerifier.IsTokenValid(user.authToken);
        }
        catch (ex) {
            throw Error("Token received at model is not valid, aborting.");
        }

        aDal.CreateFacebookUser(user);
    }
    //#endregion
}