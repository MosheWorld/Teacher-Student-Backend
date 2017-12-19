"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var express_1 = require("express");
var logger_1 = require("../LogService/logger");
//#region Members
var logger = new logger_1.Logger();
var router = express_1.Router();
//#endregion
//#region Public Methods
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
//#endregion
exports.AuthController = router;
