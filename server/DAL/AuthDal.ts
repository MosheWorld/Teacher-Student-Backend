import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/FacebookUserModel';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthDal {
    //#region Public Methods
    public CreateFacebookUser(user: FacebookUserInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            // Search for the user.
            DataBaseConnector.findOne({ id: user.id }, (error, foundUser) => {
                if (error) { reject("Error occurred when gettings teacher from database."); }

                if (foundUser == null) {
                    // User was not found and we will create new one.
                    DataBaseConnector.collection.insert(user, (error) => {
                        if (error) { reject("Error occurred when inserting to Image Create database."); }
                        resolve();
                    });
                } else {
                    // We found user, we will just update his token.
                    DataBaseConnector.collection.updateOne({ id: user.id }, {
                        $set: { "authToken": user.authToken },
                    }, (error) => {
                        if (error) { reject("Error occurred when updating recommendation at database."); }
                        resolve();
                    });
                }
            });
        });
    }
    //#endregion
}