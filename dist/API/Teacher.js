"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TeacherLogic_1 = require("./../Logic/TeacherLogic");
var router = express_1.Router();
router.get('/getall', function (req, res) {
    try {
        var tManager = new TeacherLogic_1.TeacherLogic();
        tManager.GetAll()
            .then(function (teachers) {
            res.json(teachers);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
router.get('/getbyid/:id', function (req, res) {
    try {
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
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
router.post('/getlistofteachersbyid', function (req, res) {
    try {
        if (req.body == null || req.body.listOfTeacherID == null || !IsListOfIDValid(req.body.listOfTeacherID)) {
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
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
router.post('/search', function (req, res) {
    try {
        if (req.body == null || !IsModelSearchValid(req.body)) {
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var searchData = {
            fromPrice: req.body.fromPrice,
            toPrice: req.body.toPrice,
            teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions,
            gender: req.body.gender
        };
        tManager.SearchTeacher(searchData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
router.post('/create', function (req, res) {
    try {
        if (req.body == null || !IsModelCreateValid(req.body)) {
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var teacherData = {
            firstName: req.body.firstName, lastName: req.body.lastName,
            age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
            phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions, gender: req.body.gender, recommendations: [],
            rate: req.body.rate, image: req.body.image
        };
        tManager.Create(teacherData)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
router.post('/addrecommend', function (req, res) {
    try {
        if (req.body == null || IsStringNullOrEmpty(req.body.id) || !IsRecommendValid(req.body.recommendData)) {
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
    }
    catch (ex) {
        res.status(400).send(ex);
    }
});
router.delete('/delete/:id', function (req, res) {
    try {
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
    }
    catch (ex) {
        res.status(400).send(ex.message);
    }
});
function IsModelCreateValid(model) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 200 ||
        model.priceFrom > model.priceTo ||
        model.teachesAt == null || model.teachesAt < 0 ||
        model.teachesInstitutions == null || model.teachesInstitutions.length === 0 ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.phone) ||
        IsStringNullOrEmpty(model.gender) ||
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
    // We allow model.gender to be empty, in this case we search for both genders.
    if (model == null ||
        model.fromPrice == null || model.fromPrice < 0 ||
        model.toPrice == null || model.toPrice < 0 ||
        model.teachesAt == null || model.teachesAt < 0 ||
        model.teachesInstitutions == null || model.teachesInstitutions < 0 ||
        model.gender == null) {
        return false;
    }
    else {
        return true;
    }
}
function IsRecommendValid(model) {
    if (model == null ||
        model.email == null ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
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
exports.TeacherController = router;
