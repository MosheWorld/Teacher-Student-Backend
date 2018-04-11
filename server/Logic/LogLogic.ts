import { LogDal } from "../DAL/LogDal";
import { LoggerInterface } from "../Interfaces/Logger.interface";
import { LogSearchInterface } from "../Interfaces/LogSearch.interface";

export class LogLogic {
    //#region Public Methods
    /**
     * Received logs list from database by amount given and page number given.
     * @param amount 
     * @param page 
     */
    public async GetLogsByAmountAndPageNumber(logSearchModel: LogSearchInterface): Promise<LoggerInterface[]> {
        let queryArray: any = [];

        if (logSearchModel.debug === "Debug") {
            queryArray.push({ 'type': logSearchModel.debug });
        }

        if (logSearchModel.info === "Info") {
            queryArray.push({ 'type': logSearchModel.info });
        }

        if (logSearchModel.error === "Error") {
            queryArray.push({ 'type': logSearchModel.error });
        }

        let query: any = {
            $or: queryArray
        };

        let lDal = new LogDal();
        return await lDal.GetLogsByAmountAndPageNumber(query, logSearchModel);
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