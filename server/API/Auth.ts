import * as passport from 'passport';

import { Router, Request, Response } from 'express';
import { Logger } from '../LogService/logger';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Public Methods
router.get('/facebook',
    passport.authenticate('facebook')
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

router.get('/login', (req: Request, res: Response) => {
    console.log("here");
});
//#endregion

export const AuthController: Router = router;
