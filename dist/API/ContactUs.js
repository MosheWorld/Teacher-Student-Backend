"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var ContactUsLogic_1 = require("./../Logic/ContactUsLogic");
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Routers
/**
 * Creates new 'contact us' request at database.
 * @prop {ContactUsInterface} Model The model of new contact us.
 */
router.post('/create', function (req, res) {
    try {
        logger.debug("Enter ContactUs", "Router contactus/create");
        if (req.body == null || !IsModelValid(req.body)) {
            logger.error("Model is not valid.", "contactus/create", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var cManager = new ContactUsLogic_1.ContactUsLogic();
        var contactUsData = ConvertModelToContactUsInterface(req.body);
        cManager.Create(contactUsData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Enter", "contactus/create");
    }
    catch (ex) {
        logger.error("Out", "contactus/create", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
/**
 * Receives model of 'contact us' request, Validates whether the model is valid or not.
 * @param model New contact us model.
 * @returns {boolean}
 */
function IsModelValid(model) {
    if (model == null ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.message) ||
        IsStringNullOrEmpty(model.fullName) ||
        IsStringNullOrEmpty(model.contactReason)) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Validates whether a string is null or empty.
 * @param str String.
 * @returns {boolean}
 */
function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Receives model and creates interface that contains the data to create new contact us request.
 * @param model Contact us details.
 * @returns {ContactUsInterface} Model to return.
 */
function ConvertModelToContactUsInterface(model) {
    var contactUsModel = {
        email: model.email,
        message: model.message,
        fullName: model.fullName,
        contactReason: model.contactReason
    };
    return contactUsModel;
}
//#endregion
exports.ContactUsController = router;
