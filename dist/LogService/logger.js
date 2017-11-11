"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var Logger = /** @class */ (function () {
    function Logger() {
        this.debugLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'debug-file-log',
                    filename: process.cwd() + '\\logs\\filelog-debug.log',
                    level: 'debug'
                })
            ]
        });
        this.infoLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'info-file-log',
                    filename: process.cwd() + '\\logs\\filelog-info.log',
                    level: 'info'
                })
            ]
        });
        this.errorLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'error-file-log',
                    filename: process.cwd() + '\\logs\\filelog-error.log',
                    level: 'error'
                })
            ]
        });
    }
    Logger.prototype.debug = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        this.debugLogger.debug(title, message, data);
    };
    Logger.prototype.info = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        this.infoLogger.info(title, message, data);
    };
    Logger.prototype.error = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        this.errorLogger.error(title, message, data);
    };
    return Logger;
}());
exports.Logger = Logger;
