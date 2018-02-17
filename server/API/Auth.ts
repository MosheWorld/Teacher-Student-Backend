import { Router, Request, Response } from 'express';
import { Logger } from '../LogService/logger';

import { AuthLogic } from './../Logic/AuthLogic';
import { UserInterface } from './../Interfaces/User.interface';


//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Routers
/**
 * Creates new user.
 * @prop {FacebookUserInterface} The model to create new user.
 */
router.post('/createnewuser', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Auth", "Router auth/createnewuser");

        if (req.body == null || !IsCreateNewUserValid(req.body)) {
            logger.error("Model is not valid.", "auth/createnewuser", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let aManager = new AuthLogic();
        let user: UserInterface = ConvertModelToCreateNewUserInterface(req.body);

        aManager.CreateNewUser(user)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Enter", "auth/createnewuser");
    } catch (ex) {
        logger.error("Out", "auth/createnewuser", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion

//#region Functions
/**
 * Validates whether the new request to create user is valid.
 * @param model New facebook model.
 * @returns {boolean}
 */
function IsCreateNewUserValid(model: any): boolean {
    if (model == null
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.name)
        // || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.provider)
        // || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.authToken)) {
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
    if (str === null || str === undefined || str === "") {
        return true;
    } else {
        return false;
    }
}

/**
 * Receives model and creates interface that contains the data to create new user.
 * @param model Facebook user details.
 * @returns {UserInterface} Model to return.
 */
function ConvertModelToCreateNewUserInterface(model: any): UserInterface {
    let user: UserInterface = {
        id: model.id,
        role: model.role,
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

