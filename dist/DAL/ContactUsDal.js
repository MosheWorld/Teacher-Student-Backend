"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactUsModel_1 = require("../Models/ContactUsModel");
var ContactUsDal = /** @class */ (function () {
    function ContactUsDal() {
    }
    //#region Public Methods
    ContactUsDal.prototype.GetAll = function () {
        return new Promise(function (resolve, reject) {
            var contactUsCollection = ContactUsModel_1.default.find({}, function (error, contactUs) {
                if (error) {
                    reject("Error occurred when gettings all contact us from database.");
                }
                return contactUs ? contactUs : null;
            });
            resolve(contactUsCollection);
        });
    };
    ContactUsDal.prototype.Create = function (contactUsData) {
        return new Promise(function (resolve, reject) {
            ContactUsModel_1.default.collection.insert(contactUsData, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Image Create database.");
                }
                resolve();
            });
        });
    };
    return ContactUsDal;
}());
exports.ContactUsDal = ContactUsDal;
