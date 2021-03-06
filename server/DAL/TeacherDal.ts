import { ObjectID } from 'mongodb';

import DataBaseConnector from '../DatabaseModels/TeacherModel';
import { IsObjectNullOrUndefined } from '../Abstracts/ValidationAbstract';
import { TeacherUpdateInterface } from './../Interfaces/TeacherUpdate.interface';

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
     * Receives teacher by his object ID.
     * @param id Teacher object ID as string.
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
     * Returns user by his userID.
     * @param id userID variable.
     */
    public GetByUserID(userID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let teacher = DataBaseConnector.findOne({ userID: userID }, (error, teacher) => {
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
     * Remove teacher from database by his user ID.
     * @param id Teacher ID.
     */
    public DeleteByUserID(userID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.deleteOne({ userID: userID }, (error) => {
                if (error) { reject("Error occurred when deleteing teacher from database."); }
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
     * Updates rate for the teacher.
     * @param teacherID string.
     * @param newRate number.
     */
    public UpdateRate(teacherID: string, newRate: Number): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.updateOne({ _id: new ObjectID(teacherID) },
                { $set: { "rate": newRate }, }
                , (error) => {
                    if (error) { reject("Error occurred when updating rate for teacher at database."); }
                    resolve();
                });
        });
    }

    /**
     * Receives ID of teacher and ID of new recommendations and adds it to teacher recommendations list.
     * @param teacherID String.
     * @param newRecommendationID ObjectID.
     */
    public AddRecommendationID(teacherID: string, newRecommendationID: any): Promise<void> {
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

    /**
     * Searches teacher by given user ID.
     * @param id User ID in teacher database model.
     */
    public GetTeacherByUserID(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.findOne({ userID: id }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database by user ID."); }

                if (IsObjectNullOrUndefined(teacher)) {
                    resolve(null);
                } else {
                    resolve(teacher);
                }
            });

        });
    }

    /**
     * Updates teacher model at database.
     * @param model 
     */
    public UpdateTeacherByUserID(model: TeacherUpdateInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.findOne({ userID: model.userID }, (error, teacher) => {
                if (error) { reject("Error occurred when gettings teacher from database by user ID."); }

                // Not found teacher by given user ID.
                if (IsObjectNullOrUndefined(teacher)) {
                    reject("No teacher exist by given user ID, aborting.");
                }

                // Found user, we will update the relevant fields.
                DataBaseConnector.collection.updateOne({ userID: model.userID },
                    {
                        $set: {
                            "age": model.age,
                            "phone": model.phone,
                            "email": model.email,
                            "priceTo": model.priceTo,
                            "priceFrom": model.priceFrom,
                            "lastName": model.lastName,
                            "firstName": model.firstName,
                            "personalMessage": model.personalMessage
                        },
                    }
                    , (error) => {
                        if (error) { reject("Error occurred when updating teacher at database."); }
                        resolve();
                    });
            });
        });
    }
    //#endregion
}