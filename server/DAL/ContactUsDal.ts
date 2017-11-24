import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/ContactUsModel';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

export class ContactUsDal {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter ContactUs", "DAL GetAll");

            let contactUsCollection = DataBaseConnector.find({}, (error, contactUs) => {
                if (error) { reject("Error occurred when gettings all contact us from database."); }
                return contactUs ? contactUs : null;
            });

            resolve(contactUsCollection);
        });
    }

    public Create(contactUsData: ContactUsInterface) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter ContactUs", "DAL Create", contactUsData);

            DataBaseConnector.collection.insert(contactUsData, (error) => {
                if (error) { reject("Error occurred when inserting to Image Create database."); }
                resolve();
            });
        });
    }
    //#endregion
}