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
        console.log("Here");
        console.log(teachers);
    }).catch(function (error) {
        res.status(400).send(error.message);
        console.log("Here");
        console.log(error);
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
    if (req.body == null || req.body.firstName == null || req.body.lastName == null) {
        return res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    var teacherData = { firstName: req.body.firstName, lastName: req.body.lastName };
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
exports.TeacherController = router;
