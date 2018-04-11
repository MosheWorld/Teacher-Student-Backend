import DataBaseConnector from '../DatabaseModels/LoggerModel';
import { LoggerInterface } from './../Interfaces/Logger.interface';
import { LogSearchInterface } from '../Interfaces/LogSearch.interface';

export class LogDal {
    /**
     * Received logs list from database by amount given and page number given.
     * @param amount 
     * @param page 
     */
    public GetLogsByAmountAndPageNumber(query: any, logSearchModel: LogSearchInterface): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let logCollection = DataBaseConnector
                .find(query, null, {
                    skip: (logSearchModel.amount * logSearchModel.page),
                    limit: logSearchModel.amount
                },
                    (error, logs) => {
                        if (error) { reject("Error occurred when gettings all Logs from database."); }
                        return logs ? logs : null;
                    });

            resolve(logCollection);
        });
    }

    /**
     * Receives amount of entities from database.
     */
    public GetLogsCount(): Promise<any> {
        return new Promise((resolve, reject) => {
            DataBaseConnector.count({}, function (err, count) {
                resolve(count);
            });
        });
    }
}