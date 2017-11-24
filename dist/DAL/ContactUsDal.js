"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./../LogService/logger");
var ContactUsModel_1 = require("../Models/ContactUsModel");
var ContactUsDal = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function ContactUsDal() {
        this.logger = new logger_1.Logger();
    }
    //#endregion
    //#region Public Methods
    ContactUsDal.prototype.GetAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter ContactUs", "DAL GetAll");
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter ContactUs", "DAL Create", contactUsData);
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
