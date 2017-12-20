import { AuthDal } from './../DAL/AuthDal';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthLogic {
    //#region Public Methods
    public async Create(user: FacebookUserInterface) {
        let aDal = new AuthDal();
        await aDal.Create(user);
    }
    //#endregion
}