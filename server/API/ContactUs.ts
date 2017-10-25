import { Router, Request, Response } from 'express';
import { ContactUsInterface } from './../Interfaces/ContactUs.interface';
import { ContactUsLogic } from './../Logic/ContactUsLogic';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    res.send("a");
});

router.post('/create', (req: Request, res: Response) => {

    if (req.body == null || req.body == null ||
        req.body.fullName == null || req.body.fullName === "" ||
        req.body.email == null || req.body.email === "" ||
        req.body.contactReason == null || req.body.contactReason === "" ||
        req.body.message == null || req.body.message === "") {
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

export const ContactUsController: Router = router;