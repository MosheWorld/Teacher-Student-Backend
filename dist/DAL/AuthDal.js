"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FacebookUserModel_1 = require("../Models/FacebookUserModel");
var AuthDal = /** @class */ (function () {
    function AuthDal() {
    }
    //#region Public Methods
    /**
     * Creates new user at database, if one exists, replaces authentication token.
     * @param {UserInterface} user New facebook user.
     */
    AuthDal.prototype.CreateNewUser = function (user) {
        return new Promise(function (resolve, reject) {
            // Search for the user.
            FacebookUserModel_1.default.findOne({ id: user.id }, function (error, foundUser) {
                if (error) {
                    reject("Error occurred when getting facebook teacher from database.");
                }
                if (foundUser === null || foundUser === undefined) {
                    // User was not found and we will create new one.
                    FacebookUserModel_1.default.collection.insert(user, function (error) {
                        if (error) {
                            reject("Error occurred when inserting new facebook user to database.");
                        }
                        resolve();
                    });
                }
                else {
                    // We found user, we will just update his token.
                    FacebookUserModel_1.default.collection.updateOne({ id: user.id }, {
                        $set: { "authToken": user.authToken },
                    }, function (error) {
                        if (error) {
                            reject("Error occurred when updating authentication token for facebook user at database.");
                        }
                        resolve();
                    });
                }
            });
        });
    };
    return AuthDal;
}());
exports.AuthDal = AuthDal;
