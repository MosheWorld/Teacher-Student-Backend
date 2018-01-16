import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {
    //#region Public Methods
    /**
     * Creates new contact us request.
     * @param {ContactUsInterface} contactUsData Contact us model.
     */
    public async Create(contactUsData: ContactUsInterface): Promise<void> {
        let cDal = new ContactUsDal();
        cDal.Create(contactUsData);
    }
    //#endregion
}