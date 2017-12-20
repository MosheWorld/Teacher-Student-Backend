import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/FacebookUserModel';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthDal {
    //#region Public Methods
    public Create(contactUsData: FacebookUserInterface) {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(contactUsData, (error) => {
                if (error) { reject("Error occurred when inserting to Image Create database."); }
                resolve();
            });
        });
    }
    //#endregion
}