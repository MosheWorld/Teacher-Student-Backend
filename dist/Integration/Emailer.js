"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
var Emailer = /** @class */ (function () {
    function Emailer() {
    }
    Emailer.prototype.SendEmailAsync = function (to, subject, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
    Emailer.prototype.CreateTransport = function () {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    };
    Emailer.prototype.MailOptions = function (to, subject, body) {
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
