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
router.post('/createfacebookuser', function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/createfacebookuser");
        if (req.body == null || !IsCreateFacebookUserValid(req.body)) {
            logger.error("Model is not valid.", "auth/createfacebookuser", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var aManager = new AuthLogic_1.AuthLogic();
        var user = ConvertModelToFacebookUserInterface(req.body);
        aManager.CreateFacebookUser(user)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Enter", "auth/createfacebookuser");
    }
    catch (ex) {
        logger.error("Out", "auth/createfacebookuser", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
function IsCreateFacebookUserValid(model) {
    if (model == null ||
        IsStringNullOrEmpty(model.id) ||
        IsStringNullOrEmpty(model.name) ||
        // IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.lastName) ||
        // IsStringNullOrEmpty(model.provider) ||
        // IsStringNullOrEmpty(model.photoUrl) ||
        IsStringNullOrEmpty(model.firstName) ||
        IsStringNullOrEmpty(model.authToken)) {
        return false;
    }
    else {
        return true;
    }
}
function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    }
    else {
        return false;
    }
}
function ConvertModelToFacebookUserInterface(model) {
    var user = {
        id: model.id,
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
