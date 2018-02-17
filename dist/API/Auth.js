"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../LogService/logger");
var AuthLogic_1 = require("./../Logic/AuthLogic");
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Routers
/**
 * Creates new user.
 * @prop {FacebookUserInterface} The model to create new user.
 */
router.post('/createnewuser', function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/createnewuser");
        if (req.body == null || !IsCreateNewUserValid(req.body)) {
            logger.error("Model is not valid.", "auth/createnewuser", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var aManager = new AuthLogic_1.AuthLogic();
        var user = ConvertModelToCreateNewUserInterface(req.body);
        aManager.CreateNewUser(user)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Enter", "auth/createnewuser");
    }
    catch (ex) {
        logger.error("Out", "auth/createnewuser", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
/**
 * Validates whether the new request to create user is valid.
 * @param model New facebook model.
 * @returns {boolean}
 */
function IsCreateNewUserValid(model) {
    if (model == null
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.name)
        // || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.provider)
        // || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.authToken)) {
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
    if (str === null || str === undefined || str === "") {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Receives model and creates interface that contains the data to create new user.
 * @param model Facebook user details.
 * @returns {UserInterface} Model to return.
 */
function ConvertModelToCreateNewUserInterface(model) {
    var user = {
        id: model.id,
        role: model.role,
        name: model.name,
        email: model.email,
        lastName: model.lastName,
        provider: model.provider,
        photoUrl: model.photoUrl,
        firstName: model.firstName,
        authToken: model.authToken
    };
    return user;
}
//#endregion
exports.AuthController = router;
