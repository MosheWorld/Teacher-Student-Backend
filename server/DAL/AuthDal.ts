import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/FacebookUserModel';
import { FacebookUserInterface } from './../Interfaces/FacebookUser.interface';

export class AuthDal {
    //#region Public Methods
    /**
     * Creates new facebook user at database, if one exists, replaces authentication token.
     * @param {FacebookUserInterface} user New facebook user.
     */
    public CreateFacebookUser(user: FacebookUserInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            // Search for the user.
            DataBaseConnector.findOne({ id: user.id }, (error, foundUser) => {
                if (error) { reject("Error occurred when getting facebook teacher from database."); }

                if (foundUser == null) {
                    // User was not found and we will create new one.
                    DataBaseConnector.collection.insert(user, (error) => {
                        if (error) { reject("Error occurred when inserting new facebook user to database."); }
                        resolve();
                    });
                } else {
                    // We found user, we will just update his token.
                    DataBaseConnector.collection.updateOne({ id: user.id }, {
                        $set: { "authToken": user.authToken },
                    }, (error) => {
                        if (error) { reject("Error occurred when updating authentication token for facebook user at database."); }
                        resolve();
                    });
                }
            });
        });
    }
    //#endregion
}