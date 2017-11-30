const nodemailer = require('nodemailer');

export class Emailer {

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
}