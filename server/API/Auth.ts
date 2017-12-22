import { Router, Request, Response } from 'express';
import { Logger } from '../LogService/logger';

import { AuthLogic } from './../Logic/AuthLogic';
import { FacebookUserInterface } from '../Interfaces/FacebookUser.interface';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
router.post('/createfacebookuser', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Auth", "Router auth/createfacebookuser");

        if (req.body == null || !IsCreateFacebookUserValid(req.body)) {
            logger.error("Model is not valid.", "auth/createfacebookuser", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let aManager = new AuthLogic();
        let user: FacebookUserInterface = ConvertModelToFacebookUserInterface(req.body);

        aManager.CreateFacebookUser(user)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Enter", "auth/createfacebookuser");
    } catch (ex) {
        logger.error("Out", "auth/createfacebookuser", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion

//#region Functions
function IsCreateFacebookUserValid(model: any): boolean {
    if (model == null ||
        IsStringNullOrEmpty(model.id) ||
        IsStringNullOrEmpty(model.name) ||
        // IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.lastName) ||
        // IsStringNullOrEmpty(model.provider) ||
        // IsStringNullOrEmpty(model.photoUrl) ||
        IsStringNullOrEmpty(model.firstName) ||
        IsStringNullOrEmpty(model.authToken)) {
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

function ConvertModelToFacebookUserInterface(model: any): FacebookUserInterface {
    let user: FacebookUserInterface = {
        id: model.id,
        name: model.name,
        email: model.email,
        lastName: model.lastName,
        provider: model.provider,
        photoUrl: model.photoUrl,
        firstName: model.firstName,
        authToken: model.authToken
    }

    return user;
}
//#endregion

export const AuthController: Router = router;

