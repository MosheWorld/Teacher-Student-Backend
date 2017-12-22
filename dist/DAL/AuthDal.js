"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FacebookUserModel_1 = require("../Models/FacebookUserModel");
var AuthDal = /** @class */ (function () {
    function AuthDal() {
    }
    //#region Public Methods
    AuthDal.prototype.CreateFacebookUser = function (user) {
        return new Promise(function (resolve, reject) {
            // Search for the user.
            FacebookUserModel_1.default.findOne({ id: user.id }, function (error, foundUser) {
                if (error) {
                    reject("Error occurred when gettings teacher from database.");
                }
                if (foundUser == null) {
                    // User was not found and we will create new one.
                    FacebookUserModel_1.default.collection.insert(user, function (error) {
                        if (error) {
                            reject("Error occurred when inserting to Image Create database.");
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
                            reject("Error occurred when updating recommendation at database.");
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
