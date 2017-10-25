import { ContactUsInterface } from './../Interfaces/ContactUs.interface';
import DataBaseConnector from '../Models/ContactUsModel';

export class ContactUsDal {

    public async GetAll() {
        let contactUsCollection = await DataBaseConnector.find({}, (error, contactUs) => {
            return contactUs ? contactUs : null;
        }).catch((error) => {
            return error.message;
        });
        return contactUsCollection;
    }

    public async Create(contactUsData: ContactUsInterface) {
        let returnedValue = await DataBaseConnector.collection.insert(contactUsData);
        return returnedValue;
    }
}