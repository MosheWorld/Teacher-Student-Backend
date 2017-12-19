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
    public debug(title: any = null, message: any = null, data: any = null) {
        this.debugLogger.debug(title, message, data);
    }

    public info(title: any = null, message: any = null, data: any = null) {
        this.infoLogger.info(title, message, data);
    }

    public error(title: any = null, message: any = null, data: any = null) {
        this.errorLogger.error(title, message, data);
    }
    //#endregion
}