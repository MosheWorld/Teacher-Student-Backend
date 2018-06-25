"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var RecommendationLogic_1 = require("./../Logic/RecommendationLogic");
//#region Members
var router = express_1.Router();
var logger = new logger_1.Logger();
//#endregion
//#region Routers
/**
 * Gets all recommendation of user by id ID.
 */
router.get('/getrecommendationbyid/:id', function (req, res) {
    try {
        logger.debug("Enter Recommendation", "Router recommendation/getrecommendationbyid");
        var teacherID = req.params.id;
        if (teacherID == null || teacherID === "") {
            logger.error("ID is not valid.", "recommendation/getrecommendationbyid");
            res.status(400).send("Model is not valid.");
        }
        var rManager = new RecommendationLogic_1.RecommendationLogic();
        rManager.GetRecommendationsByID(teacherID)
            .then(function (recommendationsList) {
            res.json(recommendationsList);
        }, function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "recommendation/getrecommendationbyid");
    }
    catch (ex) {
        logger.error("Out", "recommendation/getrecommendationbyid", ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Creates recommendation at database by given arguments.
 */
router.post('/create', function (req, res) {
    try {
        logger.debug("Enter Recommendation", "Router recommendation/create");
        if (req.body == null || !IsModelCreateValid(req.body)) {
            logger.error("Model is not valid.", "recommendation/create", req.body);
            return res.status(400).send("Model is not valid.");
        }
        var convertedModel = ConvertModelToRecommendationsInterface(req.body);
        var rManager = new RecommendationLogic_1.RecommendationLogic();
        rManager.Create(convertedModel)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "recommendation/create");
    }
    catch (ex) {
        logger.error("Out", "recommendation/create", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
/**
 * Converts model to interface.
 * @param model
 */
function ConvertModelToRecommendationsInterface(model) {
    var recommendationModel = {
        rate: model.rate,
        email: model.email,
        message: model.message,
        fullName: model.fullName,
        teacherID: model.teacherID
    };
    return recommendationModel;
}
/**
 * Validates whether the model is valid.
 * @param model
 */
function IsModelCreateValid(model) {
    if (model === null
        || model === undefined
        || model.rate === null
        || model.rate === undefined
        || StringNullOrEmpty(model.email)
        || StringNullOrEmpty(model.message)
        || StringNullOrEmpty(model.fullName)
        || StringNullOrEmpty(model.teacherID))
        return false;
    else
        return true;
}
/**
 * Validates whether the string is null or empty.
 * @param str String to check.
 */
function StringNullOrEmpty(str) {
    if (str === null || str === undefined || str === "")
        return true;
    else
        return false;
}
//#endregion
exports.RecommendationController = router;
