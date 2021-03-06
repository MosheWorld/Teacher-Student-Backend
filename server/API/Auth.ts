import { Router, Request, Response } from 'express';

import { Logger } from '../LogService/logger';
import { AuthLogic } from './../Logic/AuthLogic';
import { UserInterface } from './../Interfaces/User.interface';
import { UserMiddleware, AdminMiddleware } from '../Common/Middleware';
import { UserUpdateInterface } from './../Interfaces/UserUpdate.interface';
import { DoesUserExistsInterface } from './../Interfaces/DoesUserExists.interface';
import { IsObjectNullOrUndefined, IsStringNullOrEmpty } from '../Abstracts/ValidationAbstract';

//#region Members
const router: Router = Router();
const logger: Logger = new Logger();
//#endregion

//#region Routers
/**
 * Creates new user.
 * @prop {UserInterface} None The model to create new user.
 */
router.post('/createnewuser', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Auth", "Router auth/createnewuser");

        if (!IsCreateNewUserValid(req.body)) {
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
                res.status(400).send(error);
            });

        logger.info("Finished", "auth/createnewuser");
    } catch (ex) {
        logger.error("Out", "auth/createnewuser", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Validates whether user exists in database.
 * If the user exists, we will return json with data:
 * exist: {boolean} , role: {His role from database}
 */
router.post('/doesuserexistbyid', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Auth", "Router auth/doesuserexistbyid");

        if (!IsUserExistModelValid(req.body)) {
            logger.error("Model is not valid.", "auth/doesuserexistbyid", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let aManager = new AuthLogic();
        let userExistModel: DoesUserExistsInterface = ConvertExistUserModelToInterface(req.body);

        aManager.DoesUserExistsByID(userExistModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

        logger.info("Finished", "auth/doesuserexistbyid");

    } catch (ex) {
        logger.error("Out", "auth/doesuserexistbyid", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Updates user information at database.
 */
router.put('/update', UserMiddleware, (req: Request, res: Response) => {
    try {
        logger.debug("Enter Auth", "Router auth/update");

        if (!IsUserUpdateModelValid(req.body)) {
            logger.error("Model is not valid.", "auth/update", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let aManager = new AuthLogic();
        let userUpdateModel: UserUpdateInterface = ConvertUpdateUserModelToInterface(req.body);

        aManager.UpdateUser(userUpdateModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error);
            });

        logger.info("Finished", "auth/update");

    } catch (ex) {
        logger.error("Out", "auth/update", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Delete user from the database according to his ID.
 */
router.delete('/deletebyuserid/:userid', AdminMiddleware, (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router auth/deletebyuserid/" + req.params.id);

        let userid = req.params.userid;

        if (IsObjectNullOrUndefined(userid)) {
            logger.error("Model is not valid.", "auth/deletebyuserid/");
            res.status(400).send("Model is not valid.");
        }

        let aManager = new AuthLogic();

        aManager.DeleteByUserID(userid)
            .then((response) => {
                res.json(response);
            }).catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "auth/deletebyuserid/" + req.params.id);
    } catch (ex) {
        logger.error("Out", "auth/deletebyuserid/" + req.params.id, ex.message);
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
    if (IsObjectNullOrUndefined(model)
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.name)
        || IsStringNullOrEmpty(model.provider)
        || IsStringNullOrEmpty(model.authToken)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Validates whether the mode is valid or not.
 * @param model 
 */
function IsUserExistModelValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.token)
        || IsStringNullOrEmpty(model.provider))
        return false;
    else
        return true;
}

/**
 * Validates whether the model is valid or not.
 */
function IsUserUpdateModelValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || IsStringNullOrEmpty(model.id)
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.firstName)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Receives model and creates interface that contains the data to check if user exists.
 * @param model 
 */
function ConvertExistUserModelToInterface(model: any): DoesUserExistsInterface {
    let userExist: DoesUserExistsInterface = {
        id: model.id,
        token: model.token,
        provider: model.provider
    };

    return userExist;
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

/**
 * Receives model and create interface that contains the data to update user.
 * @param model 
 */
function ConvertUpdateUserModelToInterface(model: any): UserUpdateInterface {
    let user: UserUpdateInterface = {
        id: model.id,
        email: model.email,
        lastName: model.lastName,
        firstName: model.firstName
    }

    return user;
}
//#endregion

export const AuthController: Router = router;

