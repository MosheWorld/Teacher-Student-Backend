import { UserUpdateModel } from './../Interfaces/UserUpdateModel.interface';
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
                if (error) { reject("Error occurred when getting user from database."); }

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

    /**
     * Returns user from database according to given ID ( NOT UUID ).
     * @param id User ID ( NOT UUID ).
     */
    public GetUserByID(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.findOne({ id: id }, (error, foundUser) => {
                if (error) { reject("Error occurred when getting user from database."); }

                if (foundUser === null || foundUser === undefined) {
                    resolve(null);
                } else {
                    resolve(foundUser);
                }
            });
        });
    }

    /**
     * Updates token for user by his id and new token.
     * @param id ID of user ( NOT UUID ).
     * @param token New token.
     */
    public UpdateTokenToUserByID(id: string, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.updateOne({ id: id }, {
                $set: { "authToken": token },
            }, (error) => {
                if (error) { reject("Error occurred when updating authentication token for user at database."); }
                resolve();
            });
        });
    }

    /**
     * Updates user information at database.
     * @param model 
     */
    public UpdateUser(model: UserUpdateModel): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.findOne({ id: model.id }, (error, foundUser) => {
                if (error) { reject("Error occurred when update user at database while getting his info."); }

                // User was not found, aborting.
                if (foundUser === null || foundUser === undefined) {
                    reject("User doesn't exist at database, aborting.");
                }

                // Found the user, we will update the necessary fields.
                DataBaseConnector.collection.updateOne({ id: model.id }, {
                    $set: {
                        "email": model.email,
                        "lastName": model.lastName,
                        "firstName": model.firstName,
                        "name": model.firstName + " " + model.lastName
                    }
                }, (error) => {
                    if (error) { reject("Error occurred when updating user at database."); }
                    resolve();
                });
            });
        });
    }

    /**
     * Removes user by userID.
     * @param userID 
     */
    public DeleteByUserID(userID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.deleteOne({ id: userID }, (error) => {
                if (error) { reject("Error occurred when deleteing teacher from database."); }
                resolve();
            });
        });
    }
    //#endregion
}