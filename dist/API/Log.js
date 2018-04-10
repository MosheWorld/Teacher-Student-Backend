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
router.get('/getbyamountandpage/:amount/:page', function (req, res) {
    try {
        logger.debug("Enter Teacher", "Router log/getbyamountandpage/" + req.params.amount + "/" + req.params.page);
        var amount = req.params.amount;
        var page = req.params.page;
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
        var lManager = new LogLogic_1.LogLogic();
        lManager.GetLogsByAmountAndPageNumber(amount, page)
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
            console.log(error);
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
exports.LogController = router;
