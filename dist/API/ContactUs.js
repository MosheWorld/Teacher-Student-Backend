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
router.get('/getall', function (req, res) {
    try {
        logger.debug("Enter ContactUs", "Router contactus/getall");
        var cManager = new ContactUsLogic_1.ContactUsLogic();
        cManager.GetAll()
            .then(function (contactusList) {
            res.json(contactusList);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "contactus/getall");
    }
    catch (ex) {
        logger.error("Out", "contactus/getall", ex.message);
        res.status(400).send(ex.message);
    }
});
router.post('/create', function (req, res) {
    try {
        logger.debug("Enter ContactUs", "Router contactus/create");
        if (req.body == null || !IsModelValid(req.body)) {
            logger.error("Model is not valid.", "contactus/create", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var cManager = new ContactUsLogic_1.ContactUsLogic();
        var contactUsData = {
            fullName: req.body.fullName,
            email: req.body.email, contactReason: req.body.contactReason,
            message: req.body.message
        };
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
function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    }
    else {
        return false;
    }
}
//#endregion
exports.ContactUsController = router;
