import { Router, Request, Response } from 'express';

import { LogLogic } from '../Logic/LogLogic';
import { Logger } from '../LogService/logger';

const { AdminMiddleware } = require('../Common/Middleware');

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
/**
 * Received logs list from database by amount given and page number given.
 */
router.get('/getbyamountandpage/:amount/:page', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router log/getbyamountandpage/" + req.params.amount + "/" + req.params.page);

        let amount = req.params.amount;
        let page = req.params.page;

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

        let lManager = new LogLogic();

        lManager.GetLogsByAmountAndPageNumber(amount, page)
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
                console.log(error);
                res.sendStatus(400).send(error);
            });

        logger.info("Finished", "log/getlogscount");
    } catch (ex) {
        logger.error("Out", "log/getlogscount");
        res.status(400).send(ex.message);
    }
});
//#endregion

export const LogController: Router = router;