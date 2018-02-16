"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Config/Config");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Auth_1 = require("./API/Auth");
var Image_1 = require("./API/Image");
var Teacher_1 = require("./API/Teacher");
var ContactUs_1 = require("./API/ContactUs");
var Recommendation_1 = require("./API/Recommendation");
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
//#region Routers
app.use('/auth', Auth_1.AuthController);
app.use('/image', Image_1.ImageController);
app.use('/teacher', Teacher_1.TeacherController);
app.use('/contactus', ContactUs_1.ContactUsController);
app.use('/recommendation', Recommendation_1.RecommendationController);
//#endregion
// Serve the application at the given port.
app.listen(process.env.PORT, function () {
    console.log("Running on port: " + process.env.PORT + ".");
});
