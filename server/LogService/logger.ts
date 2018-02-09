import * as winston from 'winston';

export class Logger {
    //#region Members
    private infoLogger;
    private errorLogger;
    private debugLogger;
    //#endregion

    //#region Constructor
    constructor() {
        this.debugLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'debug-file-log',
                    filename: process.cwd() + '//logs//filelog-debug.log',
                    level: 'debug'
                })
            ]
        });

        this.infoLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'info-file-log',
                    filename: process.cwd() + '//logs//filelog-info.log',
                    level: 'info'
                })
            ]
        });

        this.errorLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'error-file-log',
                    filename: process.cwd() + '//logs//filelog-error.log',
                    level: 'error'
                })
            ]
        });
    }
    //#endregion

    //#region Public Methods
    /**
     * Creates debug log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public debug(title: any = null, message: any = null, data: any = null): void {
        this.debugLogger.debug(title, message, data);
    }

    /**
     * Creates info log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public info(title: any = null, message: any = null, data: any = null): void {
        this.infoLogger.info(title, message, data);
    }

    /**
     * Creates error log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    public error(title: any = null, message: any = null, data: any = null): void {
        this.errorLogger.error(title, message, data);
    }
    //#endregion
}