const nodemailer = require('nodemailer');

import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class Emailer {
    //#region Public Methods
    public async SendEmailToTeacherAsync(subject: string, teacherModel: TeacherInterface): Promise<void> {
        let body = '<div dir="ltr"></div>Hello ' + teacherModel.firstName + ' ' + teacherModel.lastName + ' and welcome to StudyHub.<br/> We hope you will find students from out application, improve your personal details and it will be fine.<br/>.<br/>Enjoy from StudyHub team and especially Moshe Binieli.<br/></div>';
        this.SendEmailAsync(teacherModel.email, subject, body);
    }

    public async SendEmailToOwnerAsync(subject: string, teacherModel: TeacherInterface): Promise<void> {
        let email = "mmoshikoo@gmail.com";
        let body = 'Hey Moshe Binieli, new teacher has joined to your application, his name is ' + teacherModel.firstName + ' ' + teacherModel.lastName + ', you may see him at databases for more information, have a good day.';
        this.SendEmailAsync(email, subject, body);
    }
    //#endregion

    //#region Private Methods
    private SendEmailAsync(to: string, subject: string, body: string): Promise<void> {
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

    private CreateTransport(): any {
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    private MailOptions(to, subject, body): any {
        return {
            from: '"StudyHub 👻" <studyhubemail@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
    }
    //#endregion
}