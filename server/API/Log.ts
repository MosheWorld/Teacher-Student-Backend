import { Router, Request, Response } from 'express';

import { LogLogic } from '../Logic/LogLogic';
import { Logger } from '../LogService/logger';
import { AdminMiddleware } from '../Common/Middleware';
import { LogSearchInterface } from '../Interfaces/LogSearch.interface';
import { IsObjectNullOrUndefined } from '../Abstracts/ValidationAbstract';

//#region Members
const router: Router = Router();
const logger: Logger = new Logger();
//#endregion

//#region Routers
/**
 * Received logs list from database by amount given and page number given.
 */
router.get('/getbyamountandpage/:amount/:page/:debug/:info/:error', AdminMiddleware, (req: Request, res: Response) => {
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
router.get('/getlogscount', AdminMiddleware, (req: Request, res: Response) => {
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
    if (IsObjectNullOrUndefined(logSearchModel)
        || IsObjectNullOrUndefined(logSearchModel.amount)
        || IsObjectNullOrUndefined(logSearchModel.page)
        || logSearchModel.amount < 1
        || logSearchModel.page < 0
        || (logSearchModel.debug === '' && logSearchModel.info === '' && logSearchModel.error === '')) {
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
    if (IsObjectNullOrUndefined(type) || type === 'false') {
        return "";
    } else if (type === 'true') {
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

    if (IsObjectNullOrUndefined(amount)) {
        amount = 50;
    } else {
        amount = parseInt(amount);
    }

    if (IsObjectNullOrUndefined(page)) {
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