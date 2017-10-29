"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TeacherLogic_1 = require("./../Logic/TeacherLogic");
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
// router.get('/search/:fromprice/:toprice/:teachesat/:teachesinstitutions/:gender', (req: Request, res: Response) => {
//     console.log(req.query.fromprice);
//     console.log(req.query.toprice);
//     console.log(req.query.teachesat);
//     console.log(req.query.teachesinstitutions);
//     console.log(req.query.gender);
//     res.send("a");
// });
router.post('/search', function (req, res) {
    if (req.body == null || !IsModelSearchValid(req.body)) {
        return res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    var searchData = {
        fromPrice: req.body.fromPrice,
        toPrice: req.body.toPrice,
        teachesAt: req.body.teachesat,
        teachesInstitutions: req.body.teachesinstitutions,
        gender: req.body.gender
    };
    tManager.SearchTeacher(searchData)
        .then(function (success) {
        res.send(success);
    })
        .catch(function (error) {
        res.status(400).send(error.message);
    });
});
router.post('/create', function (req, res) {
    if (req.body == null || !IsModelCreateValid(req.body)) {
        return res.status(400).send("Model is not valid.");
    }
    var tManager = new TeacherLogic_1.TeacherLogic();
    var teacherData = {
        firstName: req.body.firstName, lastName: req.body.lastName,
        age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
        phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
        teachesInstitutions: req.body.teachesInstitutions, gender: req.body.gender
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
function IsModelCreateValid(model) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 1000 ||
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
        model.teachesat == null || model.teachesat < 0 ||
        model.teachesinstitutions == null || model.teachesinstitutions < 0 ||
        model.gender == null) {
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
