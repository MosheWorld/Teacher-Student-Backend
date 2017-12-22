import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { ContactUsLogic } from './../Logic/ContactUsLogic';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
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

function IsStringNullOrEmpty(str: string): boolean {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

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