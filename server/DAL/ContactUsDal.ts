import DataBaseConnector from '../Models/ContactUsModel';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsDal {
    //#region Public Methods
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let contactUsCollection = DataBaseConnector.find({}, (error, contactUs) => {
                if (error) { reject("Error occurred when gettings all contact us from database."); }
                return contactUs ? contactUs : null;
            });

            resolve(contactUsCollection);
        });
    }

    public Create(contactUsData: ContactUsInterface) {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(contactUsData, (error) => {
                if (error) { reject("Error occurred when inserting to Image Create database."); }
                resolve();
            });
        });
    }
    //#endregion
}