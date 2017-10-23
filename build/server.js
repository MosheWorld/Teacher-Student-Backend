"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Teacher_1 = require("./API/Teacher");
// Create a new express application instance
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://Moshe:ab456123@ds227325.mlab.com:27325/teachers", { useMongoClient: true });
// The port the express app will listen on
var port = process.env.PORT || 3000;
app.use('/teacher', Teacher_1.TeacherController);
// Serve the application at the given port
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
