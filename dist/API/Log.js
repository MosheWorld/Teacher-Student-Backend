"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LogLogic_1 = require("../Logic/LogLogic");
var logger_1 = require("../LogService/logger");
var AdminMiddleware = require('../Common/Middleware').AdminMiddleware;
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Routers
/**
 * Received logs list from database by amount given and page number given.
 */
router.get('/getbyamountandpage/:amount/:page/:debug/:info/:error', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router log/getbyamountandpage/" + req.params.amount + "/" + req.params.page);
        var amount = req.params.amount;
        var page = req.params.page;
        var debug = GetLogTypeByString(req.params.debug, "Debug");
        var info = GetLogTypeByString(req.params.info, "Info");
        var error = GetLogTypeByString(req.params.error, "Error");
        var logSearchModel = ConvertModelToLogSearchInterface(amount, page, debug, info, error);
        if (!IsLogSearchModelValid(logSearchModel)) {
            logger.error("Model is not valid.", "Router log/getbyamountandpage", logSearchModel);
            return res.status(400).send("Model is not valid.");
        }
        var lManager = new LogLogic_1.LogLogic();
        lManager.GetLogsByAmountAndPageNumber(logSearchModel)
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
        logger.info("Finished", "log/getbyamountandpage/");
    }
    catch (ex) {
        logger.error("Out", "log/getbyamountandpage/" + req.params.amount + "/" + req.params.page, ex.message);
        res.status(400).send(ex.message);
    }
});
/**
 * Receives amount of entities from database.
 */
router.get('/getlogscount', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router log/getlogscount/");
        var lManager = new LogLogic_1.LogLogic();
        lManager.GetLogsCount()
            .then(function (success) {
            res.send(success);
        })
            .catch(function (error) {
            res.sendStatus(400).send(error);
        });
        logger.info("Finished", "log/getlogscount");
    }
    catch (ex) {
        logger.error("Out", "log/getlogscount");
        res.status(400).send(ex.message);
    }
});
//#endregion
//#region Functions
/**
 * Validates whether the parameters are valid.
 * @param logSearchModel
 */
function IsLogSearchModelValid(logSearchModel) {
    if (logSearchModel === null
        || logSearchModel === undefined
        || logSearchModel.amount === null
        || logSearchModel.amount === undefined
        || logSearchModel.page === null
        || logSearchModel.page === undefined
        || logSearchModel.amount < 1
        || logSearchModel.page < 0
        || (logSearchModel.debug === "" && logSearchModel.info === "" && logSearchModel.error === "")) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * Receive type by given input.
 * @param type
 */
function GetLogTypeByString(type, convertType) {
    if (type === null || type === undefined || type === "false") {
        return "";
    }
    else if (type === "true") {
        return convertType;
    }
    else {
        throw new Error("Invalid log type, aborting.");
    }
}
/**
 * Converts model to interface.
 * @param model
 */
function ConvertModelToLogSearchInterface(amount, page, debug, info, error) {
    if (amount === null || amount === undefined) {
        amount = 50;
    }
    else {
        amount = parseInt(amount);
    }
    if (page === null || page === undefined) {
        page = 1;
    }
    else {
        page = parseInt(page);
    }
    var newModel = {
        amount: amount,
        page: page,
        debug: debug,
        info: info,
        error: error,
    };
    return newModel;
}
//#endregion
exports.LogController = router;
