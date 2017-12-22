import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/TeacherModel';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherDal {
    //#region Public Methods
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let teachersCollection = DataBaseConnector.find({}, (error, teachers) => {
                if (error) { reject("Error occurred when gettings all Teachers from database."); }
                return teachers ? teachers : null;
            });

            resolve(teachersCollection);
        });
    }

    public GetByID(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let teacher = DataBaseConnector.findOne({ _id: new ObjectID(id) }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database."); }
                return teacher ? teacher : null;
            });

            resolve(teacher);
        });
    }

    public Create(teacherData: any): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(teacherData, (error) => {
                if (error) { reject("Error occurred when inserting to Teacher Create database."); }
                resolve(teacherData._id);
            });
        });
    }

    public DeleteByID(id: any): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) }, (error) => {
                if (error) { reject("Error occurred when deleteing teacher from database."); }
                resolve();
            });
        });
    }

    public UpdateRecommendations(id, recommendData, rateData): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.updateOne({ _id: id }, {
                $set: { "recommendations": recommendData, "rate": rateData },
            }, (error) => {
                if (error) { reject("Error occurred when updating recommendation at database."); }
                resolve();
            });
        });
    }

    public UpdateImage(id, imagePath): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.updateOne({ _id: id }, { $set: { "image": imagePath }, }
                , (error) => {
                    if (error) { reject("Error occurred when updating imagePath at database."); }
                    resolve();
                });
        });
    }

    public SearchTeacher(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let teachers = DataBaseConnector.find(query, (error, teachers) => {
                if (error) { reject("Error occurred when find teachers by query at database."); }
                return teachers ? teachers : null;
            });

            resolve(teachers);
        });
    }
    //#endregion
}