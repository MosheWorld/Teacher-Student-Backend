import { TeacherInterface } from './../Entities/Teaacher.interface';
import DataBaseConnector from '../models/TeacherModel';

export class TeacherDal {

    public async GetAll() {
        let teachersCollection = await DataBaseConnector.find({}, (error, teachers) => {
            return teachers ? teachers : null;
        }).catch((error) => {
            return error.message;
        });
        return teachersCollection;
    }

    public async Create(teacherData: TeacherInterface) {
        let returnedValue = await DataBaseConnector.collection.insert(teacherData);
        return returnedValue;
    }
}