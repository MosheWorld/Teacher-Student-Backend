"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactUsModel_1 = require("../Models/ContactUsModel");
var ContactUsDal = /** @class */ (function () {
    function ContactUsDal() {
    }
    //#region Public Methods
    /**
     * Creates new contact us request at database.
     * @param {ContactUsInterface} contactUsData Contact us model.
     */
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
