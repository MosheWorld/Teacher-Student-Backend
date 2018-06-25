import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {
    //#region Public Methods
    /**
     * Receives all contact us data from database.
     */
    public async GetAll(): Promise<any> {
        let cDal = new ContactUsDal();
        return await cDal.GetAll();
    }

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