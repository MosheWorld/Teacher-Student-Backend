"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var TeacherLogic_1 = require("./../Logic/TeacherLogic");
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Routers
router.get('/getall', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/getall");
        var tManager = new TeacherLogic_1.TeacherLogic();
        tManager.GetAll()
            .then(function (teachers) {
            res.json(teachers);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/getall");
    }
    catch (ex) {
        logger.error("Out", "teacher/getall", ex.message);
        res.status(400).send(ex.message);
    }
});
router.get('/getbyid/:id', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/getbyid" + req.params.id);
        var id = req.params.id;
        if (id == null) {
            logger.error("Model is not valid.", "teacher/getbyid/");
            res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        tManager.GetByID(id)
            .then(function (teacher) {
            res.json(teacher);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/getbyid" + req.params.id);
    }
    catch (ex) {
        logger.error("Out", "teacher/getbyid" + req.params.id, ex.message);
        res.status(400).send(ex.message);
    }
});
router.post('/getlistofteachersbyid', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/getlistofteachersbyid");
        if (req.body == null || req.body.listOfTeacherID == null || !IsListOfIDValid(req.body.listOfTeacherID)) {
            logger.error("Model is not valid.", "teacher/getlistofteachersbyid", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var arrayOfTeacherID = req.body.listOfTeacherID;
        tManager.GetListOfTeachersByID(arrayOfTeacherID)
            .then(function (teacherList) {
            res.send(teacherList);
        }).catch(function (error) {
            res.status(400).send(error);
        });
        logger.info("Out", "teacher/getlistofteachersbyid");
    }
    catch (ex) {
        logger.error("Out", "teacher/getlistofteachersbyid", ex.message);
        res.status(400).send(ex.message);
    }
});
router.post('/search', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/search");
        if (req.body == null || !IsModelSearchValid(req.body)) {
            logger.error("Model is not valid.", "teacher/search", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var searchData = {
            fromPrice: req.body.fromPrice,
            toPrice: req.body.toPrice,
            teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions,
            teachesSubjects: req.body.teachesSubjects,
            gender: req.body.gender
        };
        tManager.SearchTeacher(searchData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/search");
    }
    catch (ex) {
        logger.error("Out", "teacher/search", ex.message);
        res.status(400).send(ex.message);
    }
});
router.post('/create', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/create");
        if (req.body == null || !IsModelCreateValid(req.body)) {
            logger.error("Model is not valid.", "teacher/create", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var teacherData = {
            firstName: req.body.firstName, lastName: req.body.lastName,
            age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
            phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions, gender: req.body.gender, recommendations: [],
            rate: req.body.rate, image: req.body.image, teachesSubjects: req.body.teachesSubjects
        };
        tManager.Create(teacherData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/create");
    }
    catch (ex) {
        logger.error("Out", "teacher/create", ex.message);
        res.status(400).send(ex.message);
    }
});
router.post('/addrecommend', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/addrecommend");
        if (req.body == null || IsStringNullOrEmpty(req.body.id) || !IsRecommendValid(req.body.recommendData)) {
            logger.error("Model is not valid.", "teacher/addrecommend", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var recommendData = {
            fullName: req.body.recommendData.fullName, email: req.body.recommendData.email,
            message: req.body.recommendData.message, rate: req.body.recommendData.rate
        };
        tManager.AddRecommendToExistingTeacher(req.body.id, req.body.recommendData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/addrecommend");
    }
    catch (ex) {
        logger.error("Out", "teacher/addrecommend", ex.message);
        res.status(400).send(ex);
    }
});
router.delete('/deletebyid/:id', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/deletebyid/" + req.params.id);
        var id = req.params.id;
        if (id == null) {
            logger.error("Model is not valid.", "teacher/delete/");
            res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        tManager.DeleteByID(id)
            .then(function (response) {
            res.json(response);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/deletebyid/" + req.params.id);
    }
    catch (ex) {
        logger.error("Out", "teacher/deletebyid/" + req.params.id, ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
function IsModelCreateValid(model) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 200 ||
        model.priceFrom > model.priceTo ||
        model.teachesAt == null || model.teachesAt < 1 ||
        model.gender == null || model.gender < 0 ||
        model.teachesInstitutions == null || model.teachesInstitutions.length === 0 ||
        model.teachesSubjects == null || model.teachesSubjects.length === 0 ||
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
function IsModelSearchValid(model) {
    if (model == null ||
        model.fromPrice == null || model.fromPrice < 0 ||
        model.toPrice == null || model.toPrice < 0 ||
        model.fromPrice > model.toPrice) {
        return false;
    }
    else {
        return true;
    }
}
function IsRecommendValid(model) {
    if (model == null ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.fullName) ||
        IsStringNullOrEmpty(model.message)) {
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
function IsListOfIDValid(listOfTeacherID) {
    if (listOfTeacherID == null || listOfTeacherID.length === 0) {
        return false;
    }
    else {
        listOfTeacherID.forEach(function (element) {
            if (IsStringNullOrEmpty(element)) {
                throw new Error("One element is null or empty.");
            }
        });
        return true;
    }
}
//#endregion
exports.TeacherController = router;
