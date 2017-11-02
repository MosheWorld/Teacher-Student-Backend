"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ContactUsLogic_1 = require("./../Logic/ContactUsLogic");
var router = express_1.Router();
router.get('/getall', function (req, res) {
    var cManager = new ContactUsLogic_1.ContactUsLogic();
    cManager.GetAll()
        .then(function (contactusList) {
        res.json(contactusList);
    }).catch(function (error) {
        res.status(400).send(error.message);
    });
});
router.post('/create', function (req, res) {
    if (req.body == null || !IsModelValid(req.body)) {
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
});
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
exports.ContactUsController = router;