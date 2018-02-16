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

        let tDal = new TeacherDal();
        await tDal.AddRecommendationID(model.teacherID, createdRecommendationID);

        this.UpdateTeacherRate(model.teacherID);
    }
    //#endregion

    //#region Private Methods
    /**
     * Updates rate for teacher at database.
     * @param teacherID Teacher ID as string.
     */
    private async UpdateTeacherRate(teacherID: string): Promise<void> {
        let recommendationsList = await this.GetRecommendationsByID(teacherID);

        let newRate: number = 0;

        for (let recommend of recommendationsList) {
            newRate += recommend.rate;
        }

        newRate = newRate / recommendationsList.length;
        newRate = parseFloat((Math.round(newRate * 100) / 100).toFixed(2));

        let tDal = new TeacherDal();
        await tDal.UpdateRate(teacherID, newRate);
    }
    //#endregion
}