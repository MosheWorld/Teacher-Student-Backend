import DataBaseConnector from '../DatabaseModels/LoggerModel';
import { LoggerInterface } from './../Interfaces/Logger.interface';

export class Logger {
    //#region Constructor
    constructor() { }
    //#endregion

    //#region Public Methods
    /**
     * Creates debug log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public debug(title: any = null, message: any = null, data: any = null): void {
        let log: LoggerInterface = {
            title: title,
            message: message,
            type: 'Debug',
            data: data,
            time: new Date()
        };

        this.insertToDatabase(log);
    }

    /**
     * Creates info log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public info(title: any = null, message: any = null, data: any = null): void {
        let log: LoggerInterface = {
            title: title,
            message: message,
            type: 'Info',
            data: data,
            time: new Date()
        };

        this.insertToDatabase(log);
    }

    /**
     * Creates error log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public error(title: any = null, message: any = null, data: any = null): void {
        let log: LoggerInterface = {
            title: title,
            message: message,
            type: 'Error',
            data: data,
            time: new Date()
        };

        this.insertToDatabase(log);
    }
    //#endregion

    //#region Private Methods
    private insertToDatabase(log: LoggerInterface) {
        DataBaseConnector.collection.insert(log, (error) => {
            if (error) { console.log(error); }
        });
    }
    //#endregion
}