"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../LogService/logger");
var AuthLogic_1 = require("./../Logic/AuthLogic");
var Middleware_1 = require("../Common/Middleware");
var ValidationAbstract_1 = require("../Abstracts/ValidationAbstract");
//#region Members
var router = express_1.Router();
var logger = new logger_1.Logger();
//#endregion
//#region Routers
/**
 * Creates new user.
 * @prop {UserInterface} None The model to create new user.
 */
router.post('/createnewuser', function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/createnewuser");
        if (!IsCreateNewUserValid(req.body)) {
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
        if (!IsUserExistModelValid(req.body)) {
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
router.put('/update', Middleware_1.UserMiddleware, function (req, res) {
    try {
        logger.debug("Enter Auth", "Router auth/update");
        if (!IsUserUpdateModelValid(req.body)) {
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
/**
 * Delete user from the database according to his ID.
 */
router.delete('/deletebyuserid/:userid', Middleware_1.AdminMiddleware, function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router auth/deletebyuserid/" + req.params.id);
        var userid = req.params.userid;
        if (ValidationAbstract_1.IsObjectNullOrUndefined(userid)) {
            logger.error("Model is not valid.", "auth/deletebyuserid/");
            res.status(400).send("Model is not valid.");
        }
        var aManager = new AuthLogic_1.AuthLogic();
        aManager.DeleteByUserID(userid)
            .then(function (response) {
            res.json(response);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "auth/deletebyuserid/" + req.params.id);
    }
    catch (ex) {
        logger.error("Out", "auth/deletebyuserid/" + req.params.id, ex.message);
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
    if (ValidationAbstract_1.IsObjectNullOrUndefined(model)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.id)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.name)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.provider)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.authToken)) {
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
    if (ValidationAbstract_1.IsObjectNullOrUndefined(model)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.id)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.token)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.provider))
        return false;
    else
        return true;
}
/**
 * Validates whether the model is valid or not.
 */
function IsUserUpdateModelValid(model) {
    if (ValidationAbstract_1.IsObjectNullOrUndefined(model)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.id)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.email)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.lastName)
        || ValidationAbstract_1.IsStringNullOrEmpty(model.firstName)) {
        return false;
    }
    else {
        return true;
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
        authToken: model.authToken
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
