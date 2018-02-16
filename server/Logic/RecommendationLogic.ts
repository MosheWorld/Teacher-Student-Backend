import { TeacherDal } from './../DAL/TeacherDal';
import { RecommendationDal } from './../DAL/RecommendationDal';
import { RecommendationsInterface } from './../Interfaces/Recommendations.interface';

export class RecommendationLogic {
    //#region Public Methods
    /**
     * Returns list of all recommendations by given teacher ID.
     * @param teacherID Teacher ID.
     */
    public async GetRecommendationsByID(teacherID: string): Promise<any> {
        let rMDal = new RecommendationDal();

        let recommendationsList = await rMDal.GetRecommendationsByID(teacherID);
        return recommendationsList;
    }

    /**
     * Creates new recommendation at database.
     * @param model 
     */
    public async Create(model: RecommendationsInterface): Promise<void> {
        let rMDal = new RecommendationDal();

        let createdRecommendationID = await rMDal.Create(model);

        let tManager = new TeacherDal();
        tManager.AddRecommendationID(model.teacherID, createdRecommendationID);
    }
    //#endregion
}