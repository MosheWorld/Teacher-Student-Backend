import * as passport from 'passport';

import { Router, Request, Response } from 'express';
import { Logger } from '../LogService/logger';

//#region Members
let logger = new Logger();
const router: Router = Router();
//#endregion

//#region Public Methods
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/', failureRedirect: '/login' })
);
//#endregion

export const AuthController: Router = router;

