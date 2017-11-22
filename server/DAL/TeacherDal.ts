import { ObjectID } from 'mongodb';

import { Logger } from './../LogService/logger';
import DataBaseConnector from '../Models/TeacherModel';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherDal {
    private logger;

    public constructor() {
        this.logger = new Logger();
    }

    public async GetAll() {
        this.logger.debug("Enter Teacher", "DAL GetAll");
        let teachersCollection = await DataBaseConnector.find({}, (error, teachers) => {
            return teachers ? teachers : null;
        }).catch((error) => {
            return error.message;
        });

        return teachersCollection;
    }

    public async GetByID(id: any) {
        this.logger.debug("Enter Teacher", "DAL GetAll", { id: id });
        let teacher = await DataBaseConnector.findOne({ _id: new ObjectID(id) });
        return teacher;
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

    public async DeleteByID(id: any) {
        this.logger.debug("Enter Teacher", "DAL DeleteByID", { id: id });
        let response = await DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) });
        return response;
    }

    public async UpdateRecommendations(id, recommendData, rateData) {
        this.logger.debug("Enter Teacher", "DAL UpdateRecommendations", { id: id, recommendData: recommendData, rateData: rateData });
        DataBaseConnector.collection.updateOne({ _id: id }, {
            $set: { "recommendations": recommendData, "rate": rateData },
        });
    }

    public async UpdateImage(id, imagePath) {
        this.logger.debug("Enter Teacher", "DAL UpdateImage", { id: id, image: imagePath });
        DataBaseConnector.collection.updateOne({ _id: id }, {
            $set: { "image": imagePath },
        });
    }
}