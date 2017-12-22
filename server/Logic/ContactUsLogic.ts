import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {
    //#region Public Methods
    public async Create(contactUsData: ContactUsInterface): Promise<void> {
        let cDal = new ContactUsDal();
        cDal.Create(contactUsData);
    }
    //#endregion
}