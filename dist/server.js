"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Teacher_1 = require("./API/Teacher");
var ContactUs_1 = require("./API/ContactUs");
// Create a new express application instance.
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://Moshe:ab123456@ds133465.mlab.com:33465/teacher-student-database", { useMongoClient: true });
// The port the express app will listen on
var port = process.env.PORT || 8000;
app.use('/teacher', Teacher_1.TeacherController);
app.use('/contactus', ContactUs_1.ContactUsController);
// Serve the application at the given port.
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
