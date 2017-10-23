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
        res.status(404).send(error.message);
    });
});
router.get('/getbyid/:id', function (req, res) {
    var id = req.params.id;
    if (id == null) {
        res.status(404).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    tManager.GetByID(id)
        .then(function (teacher) {
        res.json(teacher);
    }).catch(function (error) {
        res.status(404).send(error.message);
    });
});
// Should be post method with TeacherInterface data.
router.get('/create', function (req, res) {
    var tManager = new TeacherLogic_1.TeacherLogic();
    var teacherData = { firstName: "a", lastName: "b" };
    tManager.Create(teacherData)
        .then(function (success) {
        res.send(success);
    })
        .catch(function (error) {
        res.status(404).send(error.message);
    });
});
exports.TeacherController = router;
