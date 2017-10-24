import { ObjectID } from 'mongodb';
import { TeacherInterface } from './../Interfaces/Teaacher.interface';
import DataBaseConnector from '../Models/TeacherModel';

export class TeacherDal {

    public async GetAll() {
        let teachersCollection = await DataBaseConnector.find({}, (error, teachers) => {
            return teachers ? teachers : null;
        }).catch((error) => {
            return error.message;
        });
        return teachersCollection;
    }

    public async GetByID(id) {
        let teacher = await DataBaseConnector.find({ _id: new ObjectID(id) });
        return teacher;
    }

    public async Create(teacherData: TeacherInterface) {
        let returnedValue = await DataBaseConnector.collection.insert(teacherData);
        return returnedValue;
    }

    public async DeleteByID(id) {
        let response = await DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) });
        return response;
    }
}