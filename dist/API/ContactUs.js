"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ContactUsLogic_1 = require("./../Logic/ContactUsLogic");
// Assign router to the express.Router() instance
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
    if (req.body == null || req.body == null ||
        req.body.fullName == null || req.body.fullName === "" ||
        req.body.email == null || req.body.email === "" ||
        req.body.contactReason == null || req.body.contactReason === "" ||
        req.body.message == null || req.body.message === "") {
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
exports.ContactUsController = router;
