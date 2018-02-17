import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { ContactUsLogic } from './../Logic/ContactUsLogic';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';
import { AuthLogic } from '../Logic/AuthLogic';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Middleware
/**
 * Middleware for functions that require to get authenticated users.
 * Returns 401 ( unauthorized) if user token is not valid or role is does not fit to requirements.
 * @param req 
 * @param res 
 * @param next 
 */
const AuthenticationMiddleware = async (req: Request, res: Response, next) => {
    try {
        logger.debug("Enter Middleware");

        let token = req.header('x-auth');
        let provider = req.header('provider');

        if (token === null || token === undefined || provider === null || provider === undefined) {
            logger.error("Middleware found bad token or provider.", "Token is not valid or provider is not valid.", { token: token, provider: provider });
            res.status(401).send("Given token or provider is not valid.");
        }

        try {
            let aManager = new AuthLogic();
            let userID = await aManager.GetUserIDByTokenFromProvider(token, provider);

            // Need to get user details from database and attach it to process and check role.
            next();
        } catch (error) {
            res.status(401).json(error);
        }

    } catch (ex) {
        logger.error("Something went wrong at middleware, aborting.");
        res.status(400).send("Something went wrong at middleware when validating token.");
    }
};
//#endregion

//#region Routers
/**
 * Creates new 'contact us' request at database.
 * @prop {ContactUsInterface} Model The model of new contact us.
 */
router.post('/create', (req: Request, res: Response) => {
    try {
        logger.debug("Enter ContactUs", "Router contactus/create");

        if (req.body == null || !IsModelValid(req.body)) {
            logger.error("Model is not valid.", "contactus/create", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let cManager = new ContactUsLogic();
        let contactUsData: ContactUsInterface = ConvertModelToContactUsInterface(req.body);

        cManager.Create(contactUsData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Enter", "contactus/create");
    } catch (ex) {
        logger.error("Out", "contactus/create", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion

//#region Functions
/**
 * Receives model of 'contact us' request, Validates whether the model is valid or not.
 * @param model New contact us model.
 * @returns {boolean}
 */
function IsModelValid(model: any): boolean {
    if (model == null ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.message) ||
        IsStringNullOrEmpty(model.fullName) ||
        IsStringNullOrEmpty(model.contactReason)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Validates whether a string is null or empty.
 * @param str String.
 * @returns {boolean}
 */
function IsStringNullOrEmpty(str: string): boolean {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

/**
 * Receives model and creates interface that contains the data to create new contact us request.
 * @param model Contact us details.
 * @returns {ContactUsInterface} Model to return.
 */
function ConvertModelToContactUsInterface(model: any): ContactUsInterface {
    let contactUsModel: ContactUsInterface = {
        email: model.email,
        message: model.message,
        fullName: model.fullName,
        contactReason: model.contactReason
    }

    return contactUsModel;
}
//#endregion

export const ContactUsController: Router = router;