import { _ } from 'lodash';

import { ObjectID } from 'mongodb';
import { ImageLogic } from './ImageLogic';
import { Logger } from './../LogService/logger';
import { TeacherDal } from './../DAL/TeacherDAL';
import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherLogic {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public async GetAll() {
        this.logger.debug("Enter Teacher", "Logic GetAll");
        let tDal = new TeacherDal();

        let teacherCollection = await tDal.GetAll();
        return teacherCollection;
    }

    public async GetByID(id) {
        this.logger.debug("Enter Teacher", "Logic GetByID", id);
        let tDal = new TeacherDal();

        let teacher = await tDal.GetByID(id);
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        this.logger.debug("Enter Teacher", "Logic Create", teacherData);

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

        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
    }

    public async DeleteByID(id) {
        this.logger.debug("Enter Teacher", "Logic Delete ", id);

        let tDal = new TeacherDal();
        let iManager = new ImageLogic();

        let teacher = await this.GetByID(id);

        // Run in parallel, no dependency between functions.
        tDal.DeleteByID(id);
        iManager.DeleteByID(teacher.image);
    }

    public async SearchTeacher(searchData: any) {
        this.logger.debug("Enter Teacher", "Logic SearchTeacher", searchData);
        let tDal = new TeacherDal();

        return await tDal.SearchTeacher(this.BuildSearchQuery(searchData));
    }

    public async AddRecommendToExistingTeacher(id, recommendData) {
        this.logger.debug("Enter Teacher", "Logic AddRecommendToExistingTeacher", { id: id, recommendData: recommendData });
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
        this.logger.debug("Enter Teacher", "Logic GetListOfTeachersByID", { list: listOfTeacherID });
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
    //#endregion
}