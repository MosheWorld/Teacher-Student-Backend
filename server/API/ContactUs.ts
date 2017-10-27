import { Router, Request, Response } from 'express';
import { ContactUsLogic } from './../Logic/ContactUsLogic';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    let cManager = new ContactUsLogic();

    cManager.GetAll()
        .then((contactusList) => {
            res.json(contactusList);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

router.post('/create', (req: Request, res: Response) => {

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
});

function IsModelValid(model) {
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

function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

export const ContactUsController: Router = router;