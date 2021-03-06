import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { RecommendationLogic } from './../Logic/RecommendationLogic';
import { RecommendationsInterface } from './../Interfaces/Recommendations.interface';
import { IsObjectNullOrUndefined, IsStringNullOrEmpty } from '../Abstracts/ValidationAbstract';

//#region Members
const router: Router = Router();
const logger: Logger = new Logger();
//#endregion

//#region Routers
/**
 * Gets all recommendation of user by id ID.
 */
router.get('/getrecommendationbyid/:id', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Recommendation", "Router recommendation/getrecommendationbyid");

        let teacherID = req.params.id;

        if (IsStringNullOrEmpty(teacherID)) {
            logger.error("ID is not valid.", "recommendation/getrecommendationbyid");
            res.status(400).send("Model is not valid.");
        }

        let rManager = new RecommendationLogic();

        rManager.GetRecommendationsByID(teacherID)
            .then((recommendationsList) => {
                res.json(recommendationsList);
            }, (error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "recommendation/getrecommendationbyid");
    } catch (ex) {
        logger.error("Out", "recommendation/getrecommendationbyid", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Creates recommendation at database by given arguments.
 */
router.post('/create', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Recommendation", "Router recommendation/create");

        if (!IsModelCreateValid(req.body)) {
            logger.error("Model is not valid.", "recommendation/create", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let convertedModel: RecommendationsInterface = ConvertModelToRecommendationsInterface(req.body);

        let rManager = new RecommendationLogic();

        rManager.Create(convertedModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "recommendation/create");
    } catch (ex) {
        logger.error("Out", "recommendation/create", ex.message);
        res.status(400).send(ex.message);
    }
})
//#endregion

//#region Functions
/**
 * Converts model to interface.
 * @param model 
 */
function ConvertModelToRecommendationsInterface(model: any): RecommendationsInterface {
    let recommendationModel: RecommendationsInterface = {
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
function IsModelCreateValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || IsObjectNullOrUndefined(model.rate)
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.message)
        || IsStringNullOrEmpty(model.fullName)
        || IsStringNullOrEmpty(model.teacherID))
        return false;
    else
        return true;
}
//#endregion

export const RecommendationController: Router = router;