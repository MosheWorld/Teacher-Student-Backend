import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {

    public async Create(contactUsData: ContactUsInterface) {
        let cDal = new ContactUsDal();
        await cDal.Create(contactUsData);
    }
}