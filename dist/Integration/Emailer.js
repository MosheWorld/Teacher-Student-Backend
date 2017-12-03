"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var logger_1 = require("./../LogService/logger");
var Emailer = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function Emailer() {
        this.logger = new logger_1.Logger();
    }
    //#endregion
    //#region Public Methods
    Emailer.prototype.SendEmailAsync = function (to, subject, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Emailer", "Logic and Dal SendEmailAsync", { to: to, subject: subject, body: body });
            var transporter = _this.CreateTransport();
            var mailOptions = _this.MailOptions(to, subject, body);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    };
    //#endregion
    //#region Private Methods
    Emailer.prototype.CreateTransport = function () {
        this.logger.debug("Enter Emailer", "Logic and Dal CreateTransport");
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    };
    Emailer.prototype.MailOptions = function (to, subject, body) {
        this.logger.debug("Enter Emailer", "Logic and Dal MailOptions", { to: to, subject: subject, body: body });
        return {
            from: '"StudyHub 👻" <studyhubemail@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
    };
    return Emailer;
}());
exports.Emailer = Emailer;
