"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FacebookUserModel_1 = require("../Models/FacebookUserModel");
var AuthDal = /** @class */ (function () {
    function AuthDal() {
    }
    //#region Public Methods
    AuthDal.prototype.Create = function (contactUsData) {
        return new Promise(function (resolve, reject) {
            FacebookUserModel_1.default.collection.insert(contactUsData, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Image Create database.");
                }
                resolve();
            });
        });
    };
    return AuthDal;
}());
exports.AuthDal = AuthDal;
