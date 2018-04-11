import { Router, Request, Response } from 'express';

import { LogLogic } from '../Logic/LogLogic';
import { Logger } from '../LogService/logger';
import { LogSearchInterface } from '../Interfaces/LogSearch.interface';

const { AdminMiddleware } = require('../Common/Middleware');

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
/**
 * Received logs list from database by amount given and page number given.
 */
router.get('/getbyamountandpage/:amount/:page/:debug/:info/:error', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router log/getbyamountandpage/" + req.params.amount + "/" + req.params.page);

        let amount = req.params.amount;
        let page = req.params.page;

        let debug = GetLogTypeByString(req.params.debug, "Debug");
        let info = GetLogTypeByString(req.params.info, "Info");
        let error = GetLogTypeByString(req.params.error, "Error");

        let logSearchModel: LogSearchInterface = ConvertModelToLogSearchInterface(amount, page, debug, info, error);

        if (!IsLogSearchModelValid(logSearchModel)) {
            logger.error("Model is not valid.", "Router log/getbyamountandpage", logSearchModel);
            return res.status(400).send("Model is not valid.");
        }

        let lManager = new LogLogic();

        lManager.GetLogsByAmountAndPageNumber(logSearchModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

        logger.info("Finished", "log/getbyamountandpage/");
    } catch (ex) {
        logger.error("Out", "log/getbyamountandpage/" + req.params.amount + "/" + req.params.page, ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Receives amount of entities from database.
 */
router.get('/getlogscount', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router log/getlogscount/");

        let lManager = new LogLogic();

        lManager.GetLogsCount()
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.sendStatus(400).send(error);
            });

        logger.info("Finished", "log/getlogscount");
    } catch (ex) {
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
function IsLogSearchModelValid(logSearchModel: LogSearchInterface): boolean {
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
    } else {
        return true;
    }
}

/**
 * Receive type by given input.
 * @param type 
 */
function GetLogTypeByString(type: string, convertType: string): string {
    if (type === null || type === undefined || type === "false") {
        return "";
    } else if (type === "true") {
        return convertType;
    } else {
        throw new Error("Invalid log type, aborting.");
    }
}

/**
 * Converts model to interface.
 * @param model 
 */
function ConvertModelToLogSearchInterface(amount: any, page: any, debug: any, info: any, error: any): LogSearchInterface {

    if (amount === null || amount === undefined) {
        amount = 50;
    } else {
        amount = parseInt(amount);
    }

    if (page === null || page === undefined) {
        page = 1;
    } else {
        page = parseInt(page);
    }

    let newModel: LogSearchInterface = {
        amount: amount,
        page: page,
        debug: debug,
        info: info,
        error: error,
    };

    return newModel;
}
//#endregion

export const LogController: Router = router;