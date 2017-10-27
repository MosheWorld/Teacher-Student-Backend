"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TeacherLogic_1 = require("./../Logic/TeacherLogic");
// Assign router to the express.Router() instance
var router = express_1.Router();
router.get('/getall', function (req, res) {
    var tManager = new TeacherLogic_1.TeacherLogic();
    tManager.GetAll()
        .then(function (teachers) {
        res.json(teachers);
    }).catch(function (error) {
        res.status(400).send(error.message);
    });
});
router.get('/getbyid/:id', function (req, res) {
    var id = req.params.id;
    if (id == null) {
        res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    tManager.GetByID(id)
        .then(function (teacher) {
        res.json(teacher);
    }).catch(function (error) {
        res.status(400).send(error.message);
    });
});
router.post('/create', function (req, res) {
    if (req.body == null || !IsModelValid(req.body)) {
        return res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    var teacherData = {
        firstName: req.body.firstName, lastName: req.body.lastName,
        age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
        phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
        teachesSubjects: req.body.teachesSubjects
    };
    tManager.Create(teacherData)
        .then(function (success) {
        res.send(success);
    })
        .catch(function (error) {
        res.status(400).send(error.message);
    });
});
router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    if (id == null) {
        res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    tManager.Delete(id)
        .then(function (response) {
        res.json(response);
    }).catch(function (error) {
        res.status(400).send(error.message);
    });
});
function IsModelValid(model) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.priceFrom == null ||
        model.priceFrom < 0 ||
        model.priceTo == null ||
        model.priceTo > 1000 ||
        model.teachesAt == null ||
        model.teachesAt < 0 ||
        model.teachesSubjects == null ||
        model.teachesSubjects.length === 0 ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.phone) ||
        IsStringNullOrEmpty(model.lastName) ||
        IsStringNullOrEmpty(model.firstName) ||
        IsStringNullOrEmpty(model.personalMessage)) {
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
exports.TeacherController = router;
