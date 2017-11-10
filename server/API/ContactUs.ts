import validator from 'validator';
import { Router, Request, Response } from 'express';

import { ContactUsLogic } from './../Logic/ContactUsLogic';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    try {
        let cManager = new ContactUsLogic();

        cManager.GetAll()
            .then((contactusList) => {
                res.json(contactusList);
            }).catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/create', (req: Request, res: Response) => {
    try {
        if (req.body == null || !IsModelValid(req.body)) {
            return res.status(400).send("Model is not valid.");
        }

        let cManager = new ContactUsLogic();
        let contactUsData: ContactUsInterface = {
            fullName: req.body.fullName,
            email: req.body.email, contactReason: req.body.contactReason,
            message: req.body.message
        }

        cManager.Create(contactUsData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

function IsModelValid(model: any) {
    if (model == null ||
        IsStringNullOrEmpty(model.email) || !validator.isEmail(model.email) ||
        IsStringNullOrEmpty(model.message) ||
        IsStringNullOrEmpty(model.fullName) ||
        IsStringNullOrEmpty(model.contactReason)) {
        return false;
    } else {
        return true;
    }
}

function IsStringNullOrEmpty(str: string) {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

export const ContactUsController: Router = router;