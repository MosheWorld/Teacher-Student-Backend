import { Logger } from './../LogService/logger';
import { ContactUsDal } from './../DAL/ContactUsDal';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsLogic {
    private logger;

    public constructor() {
        this.logger = new Logger();
    }

    public async GetAll() {
        this.logger.debug("Enter ContactUs", "Logic GetAll");
        let cDal = new ContactUsDal();
        await cDal.GetAll();
    }

    public async Create(contactUsData: ContactUsInterface) {
        this.logger.debug("Enter ContactUs", "Logic Create", contactUsData);
        let cDal = new ContactUsDal();
        await cDal.Create(contactUsData);
    }
}