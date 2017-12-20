import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {
    //#region Public Methods
    public async GetAll() {
        let cDal = new ContactUsDal();
        return await cDal.GetAll();
    }

    public async Create(contactUsData: ContactUsInterface) {
        let cDal = new ContactUsDal();
        await cDal.Create(contactUsData);
    }
    //#endregion
}