const nodemailer = require('nodemailer');

import { Logger } from './../LogService/Logger';

export class Emailer {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public SendEmailAsync(to: string, subject: string, body: string) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Emailer", "Logic and Dal SendEmailAsync", { to: to, subject: subject, body: body });

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
        this.logger.debug("Enter Emailer", "Logic and Dal CreateTransport");

        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    private MailOptions(to, subject, body) {
        this.logger.debug("Enter Emailer", "Logic and Dal MailOptions", { to: to, subject: subject, body: body });

        return {
            from: '"StudyHub 👻" <studyhubemail@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
    }
    //#endregion
}