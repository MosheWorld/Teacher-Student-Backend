import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { ContactUsLogic } from './../Logic/ContactUsLogic';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';
import { IsObjectNullOrUndefined, IsStringNullOrEmpty } from '../Abstracts/ValidationAbstract';

//#region Members
const router: Router = Router();
const logger: Logger = new Logger();
//#endregion

//#region Routers
/**
 * Receives all contact us data from database.
 */
router.get('/getall', (req: Request, res: Response) => {
    try {
        logger.debug("Enter ContactUs", "Router contactus/getall");

        let cManager = new ContactUsLogic();

        cManager.GetAll()
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Enter", "contactus/getall");
    } catch (ex) {
        logger.error("Out", "contactus/getall", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Creates new 'contact us' request at database.
 * @prop {ContactUsInterface} Model The model of new contact us.
 */
router.post('/create', (req: Request, res: Response) => {
    try {
        logger.debug("Enter ContactUs", "Router contactus/create");

        if (!IsModelValid(req.body)) {
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
    if (IsObjectNullOrUndefined(model)
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.message)
        || IsStringNullOrEmpty(model.fullName)
        || IsStringNullOrEmpty(model.contactReason)) {
        return false;
    } else {
        return true;
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