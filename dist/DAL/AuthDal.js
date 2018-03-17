"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1 = require("../Models/UserModel");
var AuthDal = /** @class */ (function () {
    function AuthDal() {
    }
    //#region Public Methods
    /**
     * Creates new user at database, if one exists, replaces authentication token.
     * @param {UserInterface} user New user.
     */
    AuthDal.prototype.CreateNewUser = function (user) {
        return new Promise(function (resolve, reject) {
            // Search for the user.
            UserModel_1.default.findOne({ id: user.id }, function (error, foundUser) {
                if (error) {
                    reject("Error occurred when getting user from database.");
                }
                if (foundUser === null || foundUser === undefined) {
                    // User was not found and we will create new one.
                    UserModel_1.default.collection.insert(user, function (error) {
                        if (error) {
                            reject("Error occurred when inserting new user to database.");
                        }
                        resolve();
                    });
                }
                else {
                    // We found user, we will just update his token.
                    UserModel_1.default.collection.updateOne({ id: user.id }, {
                        $set: { "authToken": user.authToken },
                    }, function (error) {
                        if (error) {
                            reject("Error occurred when updating authentication token for user at database.");
                        }
                        resolve();
                    });
                }
            });
        });
    };
    /**
     * Returns user from database according to given ID ( NOT UUID ).
     * @param id User ID ( NOT UUID ).
     */
    AuthDal.prototype.GetUserByID = function (id) {
        return new Promise(function (resolve, reject) {
            UserModel_1.default.findOne({ id: id }, function (error, foundUser) {
                if (error) {
                    reject("Error occurred when getting user from database.");
                }
                if (foundUser === null || foundUser === undefined) {
                    resolve(null);
                }
                else {
                    resolve(foundUser);
                }
            });
        });
    };
    /**
     * Updates token for user by his id and new token.
     * @param id ID of user ( NOT UUID ).
     * @param token New token.
     */
    AuthDal.prototype.UpdateTokenToUserByID = function (id, token) {
        return new Promise(function (resolve, reject) {
            UserModel_1.default.collection.updateOne({ id: id }, {
                $set: { "authToken": token },
            }, function (error) {
                if (error) {
                    reject("Error occurred when updating authentication token for user at database.");
                }
                resolve();
            });
        });
    };
    /**
     * Updates user information at database.
     * @param model
     */
    AuthDal.prototype.UpdateUser = function (model) {
        return new Promise(function (resolve, reject) {
            UserModel_1.default.findOne({ id: model.id }, function (error, foundUser) {
                if (error) {
                    reject("Error occurred when update user at database while getting his info.");
                }
                // User was not found, aborting.
                if (foundUser === null || foundUser === undefined) {
                    reject("User doesn't exist at database, aborting.");
                }
                // Found the user, we will update the necessary fields.
                UserModel_1.default.collection.updateOne({ id: model.id }, {
                    $set: {
                        "email": model.email,
                        "lastName": model.lastName,
                        "firstName": model.firstName,
                        "name": model.firstName + " " + model.lastName
                    }
                }, function (error) {
                    if (error) {
                        reject("Error occurred when updating user at database.");
                    }
                    resolve();
                });
            });
        });
    };
    /**
     * Removes user by userID.
     * @param userID
     */
    AuthDal.prototype.DeleteByUserID = function (userID) {
        return new Promise(function (resolve, reject) {
            UserModel_1.default.collection.deleteOne({ id: userID }, function (error) {
                if (error) {
                    reject("Error occurred when deleteing teacher from database.");
                }
                resolve();
            });
        });
    };
    return AuthDal;
}());
exports.AuthDal = AuthDal;
