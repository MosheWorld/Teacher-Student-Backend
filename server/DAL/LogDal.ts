import DataBaseConnector from '../DatabaseModels/LoggerModel';
import { LoggerInterface } from './../Interfaces/Logger.interface';

export class LogDal {
    /**
     * Received logs list from database by amount given and page number given.
     * @param amount 
     * @param page 
     */
    public GetLogsByAmountAndPageNumber(amount: number, page: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let logCollection = DataBaseConnector.find({}, null, { skip: (amount * page), limit: amount }, (error, logs) => {
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