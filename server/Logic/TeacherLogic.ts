import { SendEmailTo } from './../Enums/SendEmailTo.Enum';
import { _ } from 'lodash';

import { ObjectID } from 'mongodb';
import { ImageLogic } from './ImageLogic';
import { Logger } from './../LogService/logger';
import { TeacherDal } from './../DAL/TeacherDAL';
import { Emailer } from './../Integration/Emailer';
import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherLogic {
    //#region Public Methods
    public async GetAll() {
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async GetByID(id) {
        let tDal = new TeacherDal();

        let teacher = await tDal.GetByID(id);
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let image = teacherData.image;
        teacherData.image = undefined;

        const teacherObjectID = await tDal.Create(teacherData);

        let newImageObject = {
            teacherID: new ObjectID(teacherObjectID),
            image: image
        };

        const imageObjectID = await iManager.Create(newImageObject);

        // Those three functions runs in parallel to reduce performance.
        this.SendEmailToTeacher(teacherData, 'Welcome new teacher ✔', SendEmailTo.Teacher);
        this.SendEmailToTeacher(teacherData, 'New teacher has joined ✔', SendEmailTo.Owner);

        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
    }

    public async DeleteByID(id) {
        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let teacher = await this.GetByID(id);

        // Run in parallel, no dependency between functions.
        tDal.DeleteByID(id);
        iManager.DeleteByID(teacher.image);
    }

    public async SearchTeacher(searchData: any) {
        let tDal = new TeacherDal();

        return await tDal.SearchTeacher(this.BuildSearchQuery(searchData));
    }

    public async AddRecommendToExistingTeacher(id, recommendData) {
        let tDal = new TeacherDal();
        let currentTeacher = await this.GetByID(id);

        if (currentTeacher == null || currentTeacher._id == null) {
            throw new Error("User not found.");
        }

        // Adding new recommendation to the recommendation list for specific teacher.
        let recommendCollection: any[] = currentTeacher.recommendations;
        recommendCollection.push(recommendData);

        // Calculates new rate for the teacher.
        let newRate: number = 0;
        for (let recommend of recommendCollection) {
            newRate += recommend.rate;
        }
        newRate = newRate / recommendCollection.length;
        newRate = parseFloat((Math.round(newRate * 100) / 100).toFixed(2));

        return tDal.UpdateRecommendations(currentTeacher._id, recommendCollection, newRate);
    }

    public async GetListOfTeachersByID(listOfTeacherID) {
        let teacherListToReturn: any = [];
        let tDal = new TeacherDal();

        for (let id of listOfTeacherID) {
            let teacher = await tDal.GetByID(id);
            teacherListToReturn.push(teacher);
        }

        return teacherListToReturn;
    }
    //#endregion

    //#region Private Methods
    private BuildSearchQuery(searchData: any) {
        return {
            gender: this.GetGenderQuery(searchData.gender),
            teachesInstitutions: this.GetIncludesArrayQuery(searchData.teachesInstitutions),
            teachesSubjects: this.GetIncludesArrayQuery(searchData.teachesSubjects),
            teachesAt: this.GetTeachesAtQuery(searchData.teachesAt),
            priceFrom: { $lt: searchData.toPrice }
        };
    }

    private GetIncludesArrayQuery(data) {
        if (data == null) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    private GetTeachesAtQuery(data) {
        if (data == null || data == TeachesAt.Both) {
            return { $gt: 0 }
        } else {
            return { $in: [data, 3] }
        }
    }

    private GetGenderQuery(data) {
        if (data == null || data === 3) {
            return { $gt: 0 }
        } else {
            return data;
        }
    }

    private async SendEmailToTeacher(teacherData: TeacherInterface, subject: string, emailToEnum: SendEmailTo) {
        let eManager = new Emailer();

        let body = "";
        let email = "";

        if (emailToEnum == SendEmailTo.Teacher) {
            body = '<div dir="ltr"></div>Hello ' + teacherData.firstName + ' ' + teacherData.lastName + ' and welcome to StudyHub.<br/> We hope you will find students from out application, improve your personal details and it will be fine.<br/>.<br/>Enjoy from StudyHub team and especially Moshe Binieli.<br/></div>';
            email = teacherData.email;
        } else if (emailToEnum == SendEmailTo.Owner) {
            body = 'Hey Moshe Binieli, new teacher has joined to your application, his name is ' + teacherData.firstName + ' ' + teacherData.lastName + ', you may see him at databases for more information, have a good day.';
            email = "mmoshikoo@gmail.com";
        }

        eManager.SendEmailAsync(email, subject, body);
    }
    //#endregion
}