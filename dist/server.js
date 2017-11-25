"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Image_1 = require("./API/Image");
var Teacher_1 = require("./API/Teacher");
var ContactUs_1 = require("./API/ContactUs");
var RequestHttpModel_1 = require("./Models/RequestHttpModel");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://Moshe:ab123456@ds133465.mlab.com:33465/teacher-student-database', { useMongoClient: true });
// Create a new express application instance.
var app = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    MonitorRequestHttp(req);
    next();
});
// The port the express app will listen on.
var port = process.env.PORT || 8000;
//#region Routers
app.use('/image', Image_1.ImageController);
app.use('/teacher', Teacher_1.TeacherController);
app.use('/contactus', ContactUs_1.ContactUsController);
//#endregion
//#region Request Http Middleware Monitor
function MonitorRequestHttp(req) {
    /*
    This request monitor is for test and learning purposes, not bad usage or anything bad.
    The database is being deleted every 24 hours.
    Contact mmoshikoo@gmail.com for any personal request, responding fast.
    */
    return new Promise(function (resolve, reject) {
        if (req.method === "OPTIONS") {
            resolve();
            return;
        }
        var d = new Date, dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].
            join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        var newMonitor = {
            "ip": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            "path": req.originalUrl,
            "date": dformat.toString(),
            "method": req.method,
            "body": req.body
        };
        RequestHttpModel_1.default.collection.insert(newMonitor, function (error) { resolve(); });
    });
}
//#endregion
// Serve the application at the given port.
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
