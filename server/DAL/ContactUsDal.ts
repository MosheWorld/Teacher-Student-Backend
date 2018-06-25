import DataBaseConnector from '../DatabaseModels/ContactUsModel';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsDal {
    //#region Public Methods
    /**
     * Receives all contact us data from database.
     */
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let contactUsCollection = DataBaseConnector.find({}, (error, contactUsList) => {
                if (error) { reject("Error occurred when gettings all Contact Us list from database."); }
                return contactUsList ? contactUsList : null;
            });

            resolve(contactUsCollection);
        });
    }
    /**
     * Creates new contact us request at database.
     * @param {ContactUsInterface} contactUsData Contact us model.
     */
    public Create(contactUsData: ContactUsInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(contactUsData, (error) => {
                if (error) { reject("Error occurred when inserting to Image Create database."); }
                resolve();
            });
        });
    }
    //#endregion
}