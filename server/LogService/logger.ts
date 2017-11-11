import * as winston from 'winston';

export class Logger {
    private debugLogger;
    private infoLogger;
    private errorLogger;

    constructor() {
        this.debugLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'debug-file-log',
                    filename: 'logs\\filelog-debug.log',
                    level: 'debug'
                })
            ]
        });

        this.infoLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'info-file-log',
                    filename: 'logs\\filelog-info.log',
                    level: 'info'
                })
            ]
        });

        this.errorLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'error-file-log',
                    filename: 'logs\\filelog-error.log',
                    level: 'error'
                })
            ]
        });
    }

    public debug(title: any = null, message: any = null, data: any = null) {
        this.debugLogger.debug(title, message, data);
    }

    public info(title: any = null, message: any = null, data: any = null) {
        this.infoLogger.info(title, message, data);
    }

    public error(title: any = null, message: any = null, data: any = null) {
        this.errorLogger.error(title, message, data);
    }
}