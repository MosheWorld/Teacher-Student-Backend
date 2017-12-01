import { ObjectID } from 'mongodb';

import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/TeacherModel';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherDal {
    //#region Members
    private logger;
    //#endregion

    //#region Constructor
    public constructor() {
        this.logger = new Logger();
    }
    //#endregion

    //#region Public Methods
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL GetAll");

            let teachersCollection = DataBaseConnector.find({}, (error, teachers) => {
                if (error) { reject("Error occurred when gettings all Teachers from database."); }
                return teachers ? teachers : null;
            });

            resolve(teachersCollection);
        });
    }

    public GetByID(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL GetByID", { id: id });

            let teacher = DataBaseConnector.findOne({ _id: new ObjectID(id) }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database."); }
                return teacher ? teacher : null;
            });

            resolve(teacher);
        });
    }

    public Create(teacherData: any) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL Create", teacherData);

            DataBaseConnector.collection.insert(teacherData, (error) => {
                if (error) { reject("Error occurred when inserting to Teacher Create database."); }
                resolve(teacherData._id);
            });
        });
    }

    public DeleteByID(id: any) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL DeleteByID", { id: id });

            DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) }, (error) => {
                if (error) { reject("Error occurred when deleteing teacher from database."); }
                resolve();
            });
        });

    }

    public UpdateRecommendations(id, recommendData, rateData) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL UpdateRecommendations", { id: id, recommendData: recommendData, rateData: rateData });

            DataBaseConnector.collection.updateOne({ _id: id }, {
                $set: { "recommendations": recommendData, "rate": rateData },
            }, (error) => {
                if (error) { reject("Error occurred when updating recommendation at database."); }
                resolve();
            });
        });
    }

    public UpdateImage(id, imagePath) {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL UpdateImage", { id: id, image: imagePath });

            DataBaseConnector.collection.updateOne({ _id: id }, { $set: { "image": imagePath }, }
                , (error) => {
                    if (error) { reject("Error occurred when updating imagePath at database."); }
                    resolve();
                });
        });
    }

    public SearchTeacher(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.debug("Enter Teacher", "DAL SearchTeacher", { query: query });

            let teachers = DataBaseConnector.find(query, (error, teachers) => {
                if (error) { reject("Error occurred when find teachers by query at database."); }
                return teachers ? teachers : null;
            });

            resolve(teachers);
        });
    }
    //#endregion
}