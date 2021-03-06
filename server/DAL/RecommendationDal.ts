import DataBaseConnector from "../DatabaseModels/RecommendationModel";

import { ObjectID } from 'mongodb';

export class RecommendationDal {
    //#region Public Methods
    /**
     * Returns list of all recommendations by given teacher ID.
     * @param teacherID Teacher ID.
     */
    public GetRecommendationsByID(teacherID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let recommendationList = DataBaseConnector.find({ "teacherID": teacherID }, (error, teachers) => {
                if (error) { reject("Error occurred when gettings all recommendation from database."); }
            });

            resolve(recommendationList);
        });
    }

    /**
     * Creates new recommendation at database and returns the ObjectD.
     * @param {RecommendationsInterface} model This is the type of this model.
     */
    public Create(model: any): Promise<ObjectID> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.collection.insert(model, (error) => {
                if (error) { reject("Error occurred when creating new entity for recommendation at database."); }
                resolve(model._id);
            });
        });
    }
    //#endregion
}