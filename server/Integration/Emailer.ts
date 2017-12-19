const nodemailer = require('nodemailer');

import { Logger } from './../LogService/logger';

export class Emailer {
    //#region Public Methods
    public SendEmailAsync(to: string, subject: string, body: string) {
        return new Promise((resolve, reject) => {
            let transporter = this.CreateTransport();
            let mailOptions = this.MailOptions(to, subject, body);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
    //#endregion

    //#region Private Methods
    private CreateTransport() {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    private MailOptions(to, subject, body) {
        return {
            from: '"StudyHub 👻" <studyhubemail@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
    }
    //#endregion
}