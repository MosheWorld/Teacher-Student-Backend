import { GoogleVerifier } from './../Integration/GoogleVerifier';
import { AuthDal } from './../DAL/AuthDal';
import { FacebookVerifier } from '../Integration/FacebookVerifier';
import { UserInterface } from './../Interfaces/User.interface';


export class AuthLogic {
    //#region Public Methods
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
            console.log("Token is valid, going to DAL.");
            aDal.CreateNewUser(user);
        } else {
            throw new Error("Given token is not valid, aborting.");
        }
    }
    //#endregion
}