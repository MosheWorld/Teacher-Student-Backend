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
router.get('/create', function (req, res) {
    var tManager = new TeacherLogic_1.TeacherLogic();
    var teacherData = { firstname: "baba", lastname: "abab" };
    tManager.Create(teacherData)
        .catch(function (error) {
        res.status(404).send(error.message);
    });
});
exports.TeacherController = router;
