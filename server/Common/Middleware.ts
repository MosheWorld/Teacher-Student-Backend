import { Request, Response } from 'express';

import { AuthLogic } from '../Logic/AuthLogic';
import { Logger } from './../LogService/logger';
import { RoleEnum } from './../Enums/Role.Enum';

//#region Members
const logger: Logger = new Logger();
//#endregion

//#region Middleware
/**
 * Middleware for functions that require to get authenticated users.
 * Returns 401 ( unauthorized) if user token is not valid.
 * @param req 
 * @param res 
 * @param next 
 */
const UserMiddleware = async (req: Request, res: Response, next) => {
    try {
        logger.debug("Enter User Middleware");

        let token = req.header('x-auth');
        let provider = req.header('provider');

        if (token === null || token === undefined || provider === null || provider === undefined) {
            logger.error("Middleware found bad token or provider.", "Token is not valid or provider is not valid.", { token: token, provider: provider });
            res.status(401).send("Given token or provider is not valid.");
        }

        try {
            let currentUser = await GetUserByTokenAndProvider(token, provider);
            process["currentUser"] = currentUser;

            logger.info("User logged in.", "User logged in.", currentUser);

            next();
        } catch (error) {
            res.status(401).json(error);
        }

    } catch (ex) {
        logger.error("Something went wrong at middleware, aborting.");
        res.status(400).send("Something went wrong at middleware when validating token.");
    }
};

/**
 * Middleware for functions that require to get authenticated users.
 * Returns 401 ( unauthorized) if user token is not valid or role is does not fit to requirements.
 * @param req 
 * @param res 
 * @param next 
 */
const AdminMiddleware = async (req: Request, res: Response, next) => {
    try {
        logger.debug("Enter User Middleware");

        let token = req.header('x-auth');
        let provider = req.header('provider');

        if (token === null || token === undefined || provider === null || provider === undefined) {
            logger.error("Middleware found bad token or provider.", "Token is not valid or provider is not valid.", { token: token, provider: provider });
            res.status(401).send("Given token or provider is not valid.");
        }

        try {
            let currentUser = await GetUserByTokenAndProvider(token, provider);

            if (currentUser.role !== RoleEnum.Admin) {
                logger.error("Non Admin token tried to access security zone.", "", { token: token, provider: provider });
                res.status(401).send("You're not admin, access denied.");
            }

            process["currentUser"] = currentUser;

            logger.info("Admin logged in.", "Admin logged in.", currentUser);

            next();
        } catch (error) {
            res.status(401).json(error);
        }

    } catch (ex) {
        logger.error("Something went wrong at middleware, aborting.");
        res.status(400).send("Something went wrong at middleware when validating token.");
    }
};

/**
 * Receives user ID from token and provider by taking to their API.
 * Receives the user from database and returns his details.
 * @param token 
 * @param provider 
 */
const GetUserByTokenAndProvider = async (token: string, provider: string) => {
    let aManager = new AuthLogic();
    let userID = await aManager.GetUserIDByTokenFromProvider(token, provider);

    let currentUser = await aManager.GetUserByID(userID);

    return currentUser;
};
//#endregion

export { UserMiddleware, AdminMiddleware };