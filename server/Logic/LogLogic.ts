import { LogDal } from "../DAL/LogDal";
import { LoggerInterface } from "../Interfaces/Logger.interface";

export class LogLogic {
    //#region Public Methods
    /**
     * Received logs list from database by amount given and page number given.
     * @param amount 
     * @param page 
     */
    public async GetLogsByAmountAndPageNumber(amount: number, page: number): Promise<LoggerInterface[]> {
        let lDal = new LogDal();
        return await lDal.GetLogsByAmountAndPageNumber(amount, page);
    }

    /**
     * Receives amount of entities from database.
     */
    public async GetLogsCount(): Promise<any> {
        let lDal = new LogDal();
        let result = await lDal.GetLogsCount();
        return { count: result };
    }
    //#endregion
}