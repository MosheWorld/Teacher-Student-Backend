import DataBaseConnector from '../DatabaseModels/ContactUsModel';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsDal {
    //#region Public Methods
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