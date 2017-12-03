"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Config/Config");
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var Auth_1 = require("./API/Auth");
var Image_1 = require("./API/Image");
var Teacher_1 = require("./API/Teacher");
var ContactUs_1 = require("./API/ContactUs");
var FacebookStrategy = require('passport-facebook').Strategy;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
// Create a new express application instance.
var app = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//#region Auth Loggers
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(profile);
}));
//#endregion
//#region Routers
app.use('/auth', Auth_1.AuthController);
app.use('/image', Image_1.ImageController);
app.use('/teacher', Teacher_1.TeacherController);
app.use('/contactus', ContactUs_1.ContactUsController);
//#endregion
// Serve the application at the given port.
app.listen(process.env.PORT, function () {
    console.log("Listening at http://localhost:" + process.env.PORT + "/");
});
