import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/TeacherModel';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherDal {
    public async GetAll() {
        let teachersCollection = await DataBaseConnector.find({}, (error, teachers) => {
            return teachers ? teachers : null;
        }).catch((error) => {
            return error.message;
        });

        return teachersCollection;
    }

    public async GetByID(id: any) {
        let teacher = await DataBaseConnector.findOne({ _id: new ObjectID(id) });
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        let returnedValue = await DataBaseConnector.collection.insert(teacherData);
        return returnedValue;
    }

    public async DeleteByID(id: any) {
        let response = await DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) });
        return response;
    }

    public async UpdateRecommendations(id, recommendData, rateData) {
        DataBaseConnector.collection.updateOne({ _id: id }, {
            $set: { "recommendations": recommendData, "rate": rateData },
        });
    }
}