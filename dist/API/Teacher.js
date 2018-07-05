"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var TeacherLogic_1 = require("./../Logic/TeacherLogic");
var Middleware_1 = require("../Common/Middleware");
//#region Members
var router = express_1.Router();
var logger = new logger_1.Logger();
//#endregion
//#region Routers
/**
 * Returns all teachers that exists.
 */
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
/**
 * Returns specific teacher by his ID at database.
 */
router.get('/getbyid/:id', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/getbyid " + req.params.id);
        var id = req.params.id;
        if (id === null || id === undefined) {
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
        logger.error("Out", "teacher/getbyid/" + req.params.id, ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Returns teacher by given token at headers.
 */
router.get('/getteacherbytoken', Middleware_1.UserMiddleware, function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/getteacherbytoken");
        var userInfo = process["currentUser"];
        if (userInfo === null || userInfo === undefined || userInfo.id === null || userInfo.id === undefined) {
            logger.error("Model is not valid.", "teacher/getteacherbytoken");
            res.status(400).send("Model is not valid.");
        }
        var id = userInfo.id;
        var tManager = new TeacherLogic_1.TeacherLogic();
        tManager.GetTeacherByUserID(id)
            .then(function (teacher) {
            res.json(teacher);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/getteacherbytoken");
    }
    catch (ex) {
        logger.error("Out", "teacher/getteacherbytoken", ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Returns list of teachers according to their IDs.
 */
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
/**
 * Searches for teachers according to search model.
 * @prop {SearchTeacherInterface} Model The model of the search.
 */
router.post('/search', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/search", req.body);
        if (req.body == null || !IsTeacherSearchModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/search", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var searchTeacherModel = GetSearchDataModel(req.body);
        tManager.SearchTeacher(searchTeacherModel)
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
/**
 * Creates new teacher according to create model.
 * @prop {TeacherInterface} Model The create model.
 */
router.post('/create', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/create");
        if (req.body == null || req.body === undefined || !IsCreateModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/create", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var teacherData = ConvertCreateModelToTeacherInterface(req.body);
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
/**
 * Updates teacher model at database.
 */
router.put('/update', Middleware_1.UserMiddleware, function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router teacher/update");
        if (req.body == null || req.body === undefined || !IsTeacherUpdateModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/update", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var tManager = new TeacherLogic_1.TeacherLogic();
        var teacherUpdateModel = ConvertUpdateModelToTeacherInterface(req.body);
        tManager.UpdateTeacherByUserID(teacherUpdateModel)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "teacher/update");
    }
    catch (ex) {
        logger.error("Out", "teacher/update", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
/**
 * Validates whether the new request to create teacher is valid.
 * @param model New teacher model.
 * @returns {boolean}
 */
function IsCreateModelValid(model) {
    if (model === null
        || model === undefined
        || model.age == null
        || model.age < 0
        || model.age > 120
        || model.rate == null
        || model.rate < 0
        || model.rate > 5
        || model.priceFrom == null
        || model.priceFrom < 0
        || model.priceTo == null
        || model.priceTo > 200
        || model.priceFrom > model.priceTo
        || model.teachesAt == null
        || model.teachesAt < 1
        || model.gender == null
        || model.gender < 0
        || model.teachesInstitutions == null
        || model.teachesInstitutions.length === 0
        || model.teachesSubjects == null
        || model.teachesSubjects.length === 0
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.phone)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.personalMessage)
        || IsStringNullOrEmpty(model.userID)) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Validates whether the new request to search teacher is valid.
 * @param model New search model.
 * @returns {boolean}
 */
function IsTeacherSearchModelValid(model) {
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
/**
 * Validates whether the model is valid.
 * @param model
 */
function IsTeacherUpdateModelValid(model) {
    if (model === null
        || model === undefined
        || model.age < 18
        || model.age > 120
        || model.priceTo < 0 || model.priceTo > 200
        || model.priceFrom < 0 || model.priceFrom > 200
        || model.priceFrom > model.priceTo
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.userID)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.phone)
        || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.personalMessage)) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Validates whether the new request to recommend a teacher is valid.
 * @param model New recommendation model.
 * @returns {boolean}
 */
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
/**
 * Validates whether a string is null or empty.
 * @param str String.
 * @returns {boolean}
 */
function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Validates whether the array of IDs are valid.
 * @param listOfTeacherID Array of IDs from database.
 * @returns {boolean}
 */
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
/**
 * Converts update model to interface.
 * @param model
 */
function ConvertUpdateModelToTeacherInterface(model) {
    var teacher = {
        age: model.age,
        email: model.email,
        phone: model.phone,
        userID: model.userID,
        priceTo: model.priceTo,
        lastName: model.lastName,
        priceFrom: model.priceFrom,
        firstName: model.firstName,
        personalMessage: model.personalMessage
    };
    return teacher;
}
/**
 * Receives model and creates interface that contains the data to search.
 * @param model Search details.
 * @returns {SearchTeacherInterface} Model to return.
 */
function GetSearchDataModel(model) {
    var searchTeacherModel = {
        gender: model.gender,
        toPrice: model.toPrice,
        fromPrice: model.fromPrice,
        teachesAt: model.teachesAt,
        teachesSubjects: model.teachesSubjects,
        teachesInstitutions: model.teachesInstitutions
    };
    return searchTeacherModel;
}
/**
 * Receives model and creates interface that contains the data to create new teacher.
 * @param model Teacher details.
 * @returns {TeacherInterface} Model to return.
 */
function ConvertCreateModelToTeacherInterface(model) {
    var teacherModel = {
        age: model.age,
        rate: model.rate,
        phone: model.phone,
        email: model.email,
        image: model.image,
        userID: model.userID,
        priceTo: model.priceTo,
        lastName: model.lastName,
        firstName: model.firstName,
        priceFrom: model.priceFrom,
        teachesAt: model.teachesAt,
        teachesSubjects: model.teachesSubjects,
        personalMessage: model.personalMessage,
        gender: model.gender, recommendations: [],
        teachesInstitutions: model.teachesInstitutions
    };
    return teacherModel;
}
//#endregion
exports.TeacherController = router;
