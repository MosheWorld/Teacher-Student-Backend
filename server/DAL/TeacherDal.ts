import { ObjectID } from 'mongodb';

import DataBaseConnector from '../Models/TeacherModel';
import { TeacherInterface } from './../Interfaces/Teacher.interface';

export class TeacherDal {
    //#region Public Methods
    /**
     * Receives all teachers from database.
     * @returns Array of teachers.
     */
    public GetAll(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let teachersCollection = DataBaseConnector.find({}, (error, teachers) => {
                if (error) { reject("Error occurred when gettings all Teachers from database."); }
                return teachers ? teachers : null;
            });

            resolve(teachersCollection);
        });
    }

    /**
     * Receives teacher by his ID.
     * @param id Teacher ID.
     * @returns Single teacher.
     */
    public GetByID(id: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let teacher = DataBaseConnector.findOne({ _id: new ObjectID(id) }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database."); }
                return teacher ? teacher : null;
            });

            resolve(teacher);
        });
    }

    /**
     * Creates new teacher at database.
     * @param teacherData Teacher data.
     * @returns Returns new teacher ID as ObjectID.
     */
    public Create(teacherData: any): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(teacherData, (error) => {
                if (error) { reject("Error occurred when inserting to Teacher Create database."); }
                resolve(teacherData._id);
            });
        });
    }

    /**
     * Remove teacher from database by his ID.
     * @param id Teacher ID.
     */
    public DeleteByID(id: any): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.deleteOne({ _id: new ObjectID(id) }, (error) => {
                if (error) { reject("Error occurred when deleteing teacher from database."); }
                resolve();
            });
        });
    }

    /**
     * Updates recommendation of teacher.
     * @param id Teacher ID.
     * @param recommendData Recommendation data.
     * @param rateData New teacher rate.
     */
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

    /**
     * Updates teacher image at database.
     * @param id Teacher ID.
     * @param imagePathNew image ID from image database.
     */
    public UpdateImage(id, imagePath): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.updateOne({ _id: id }, { $set: { "image": imagePath }, }
                , (error) => {
                    if (error) { reject("Error occurred when updating imagePath at database."); }
                    resolve();
                });
        });
    }

    /**
     * Searches for teacher according to given query.
     * @param query MongoDB query.
     * @return Teacher.
     */
    public SearchTeacher(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let teachers = DataBaseConnector.find(query, (error, teachers) => {
                if (error) { reject("Error occurred when find teachers by query at database."); }
                return teachers ? teachers : null;
            });

            resolve(teachers);
        });
    }

    /**
     * Receives ID of teacher and ID of new recommendations and adds it to teacher recommendations list.
     * @param teacherID String.
     * @param newRecommendationID ObjectID.
     */
    public AddRecommendationID(teacherID: string, newRecommendationID: any) {
        return new Promise((resolve, reject) => {
            DataBaseConnector.findOne({ _id: new ObjectID(teacherID) }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database."); }

                let recommendationsList = teacher.recommendations;
                recommendationsList.push(newRecommendationID.toString());

                DataBaseConnector.collection.updateOne({ _id: new ObjectID(teacherID) },
                    { $set: { "recommendations": recommendationsList }, }
                    , (error) => {
                        if (error) { reject("Error occurred when updating recommendations for teacher at database."); }
                        resolve();
                    }); 
            });
        });
    }
    //#endregion
}