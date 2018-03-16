"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../LogService/logger");
var AuthLogic_1 = require("./../Logic/AuthLogic");
var UserMiddleware = require('../Common/Middleware').UserMiddleware;
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Routers
/**
 * Creates new user.
 * @prop {UserInterface} None The model to create new user.
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
            res.status(400).send(error);
        });
        logger.info("Finished", "auth/createnewuser");
    }
    catch (ex) {
        logger.error("Out", "auth/createnewuser", ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Validates whether user exists in database.
 * If the user exists, we will return json with data:
 * exist: {boolean} , role: {His role from database}
 */
router.post('/doesuserexistbyid', function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/doesuserexistbyid");
        if (req.body === null || req.body === undefined || !IsUserExistModelValid(req.body)) {
            logger.error("Model is not valid.", "auth/doesuserexistbyid", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var aManager = new AuthLogic_1.AuthLogic();
        var userExistModel = ConvertExistUserModelToInterface(req.body);
        aManager.DoesUserExistsByID(userExistModel)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
        logger.info("Finished", "auth/doesuserexistbyid");
    }
    catch (ex) {
        logger.error("Out", "auth/doesuserexistbyid", ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Updates user information at database.
 */
router.put('/update', UserMiddleware, function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/update");
        if (req.body === null || req.body === undefined || !IsUserUpdateModelValid(req.body)) {
            logger.error("Model is not valid.", "auth/update", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var aManager = new AuthLogic_1.AuthLogic();
        var userUpdateModel = ConvertUpdateUserModelToInterface(req.body);
        aManager.UpdateUser(userUpdateModel)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
        logger.info("Finished", "auth/update");
    }
    catch (ex) {
        logger.error("Out", "auth/update", ex.message);
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
 * Validates whether the mode is valid or not.
 * @param model
 */
function IsUserExistModelValid(model) {
    if (model === null
        || model === undefined
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.token)
        || IsStringNullOrEmpty(model.provider))
        return false;
    else
        return true;
}
/**
 * Validates whether the model is valid or not.
 */
function IsUserUpdateModelValid(model) {
    if (model === null
        || model === undefined
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.firstName)) {
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
 * Receives model and creates interface that contains the data to check if user exists.
 * @param model
 */
function ConvertExistUserModelToInterface(model) {
    var userExist = {
        id: model.id,
        token: model.token,
        provider: model.provider
    };
    return userExist;
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
        authToken: model.authToken,
        filledTeacherForm: false
    };
    return user;
}
/**
 * Receives model and create interface that contains the data to update user.
 * @param model
 */
function ConvertUpdateUserModelToInterface(model) {
    var user = {
        id: model.id,
        email: model.email,
        lastName: model.lastName,
        firstName: model.firstName
    };
    return user;
}
//#endregion
exports.AuthController = router;
