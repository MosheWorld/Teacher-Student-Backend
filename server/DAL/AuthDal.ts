import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/UserModel';
import { UserInterface } from './../Interfaces/User.interface';

export class AuthDal {
    //#region Public Methods
    /**
     * Creates new user at database, if one exists, replaces authentication token.
     * @param {UserInterface} user New user.
     */
    public CreateNewUser(user: UserInterface): Promise<void> {
        return new Promise((resolve, reject) => {

            // Search for the user.
            DataBaseConnector.findOne({ id: user.id }, (error, foundUser) => {
                if (error) { reject("Error occurred when getting facebook teacher from database."); }

                if (foundUser === null || foundUser === undefined) {
                    // User was not found and we will create new one.
                    DataBaseConnector.collection.insert(user, (error) => {
                        if (error) { reject("Error occurred when inserting new user to database."); }
                        resolve();
                    });
                } else {
                    // We found user, we will just update his token.
                    DataBaseConnector.collection.updateOne({ id: user.id }, {
                        $set: { "authToken": user.authToken },
                    }, (error) => {
                        if (error) { reject("Error occurred when updating authentication token for user at database."); }
                        resolve();
                    });
                }
            });
        });
    }
    //#endregion
}