"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LogLogic_1 = require("../Logic/LogLogic");
var logger_1 = require("../LogService/logger");
var Middleware_1 = require("../Common/Middleware");
var ValidationAbstract_1 = require("../Abstracts/ValidationAbstract");
//#region Members
var router = express_1.Router();
var logger = new logger_1.Logger();
//#endregion
//#region Routers
/**
 * Received logs list from database by amount given and page number given.
 */
router.get('/getbyamountandpage/:amount/:page/:debug/:info/:error', Middleware_1.AdminMiddleware, function (req, res) {
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
router.get('/getlogscount', Middleware_1.AdminMiddleware, function (req, res) {
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
    if (ValidationAbstract_1.IsObjectNullOrUndefined(logSearchModel)
        || ValidationAbstract_1.IsObjectNullOrUndefined(logSearchModel.amount)
        || ValidationAbstract_1.IsObjectNullOrUndefined(logSearchModel.page)
        || logSearchModel.amount < 1
        || logSearchModel.page < 0
        || (logSearchModel.debug === '' && logSearchModel.info === '' && logSearchModel.error === '')) {
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
    if (ValidationAbstract_1.IsObjectNullOrUndefined(type) || type === 'false') {
        return "";
    }
    else if (type === 'true') {
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
    if (ValidationAbstract_1.IsObjectNullOrUndefined(amount)) {
        amount = 50;
    }
    else {
        amount = parseInt(amount);
    }
    if (ValidationAbstract_1.IsObjectNullOrUndefined(page)) {
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
