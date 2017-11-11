import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/ContactUsModel';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsDal {
    private logger;

    public constructor() {
        this.logger = new Logger();
    }

    public async GetAll() {
        this.logger.debug("Enter ContactUs", "DAL GetAll");
        let contactUsCollection = await DataBaseConnector.find({}, (error, contactUs) => {
            return contactUs ? contactUs : null;
        }).catch((error) => {
            return error.message;
        });

        return contactUsCollection;
    }

    public async Create(contactUsData: ContactUsInterface) {
        this.logger.debug("Enter ContactUs", "DAL Create", contactUsData);
        let returnedValue = await DataBaseConnector.collection.insert(contactUsData);
        return returnedValue;
    }
}