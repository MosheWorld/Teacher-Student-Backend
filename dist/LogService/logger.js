"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerModel_1 = require("../DatabaseModels/LoggerModel");
var Logger = /** @class */ (function () {
    //#region Constructor
    function Logger() {
    }
    //#endregion
    //#region Public Methods
    /**
     * Creates debug log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    Logger.prototype.debug = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        var log = {
            title: title,
            message: message,
            type: 'Debug',
            data: data,
            time: new Date()
        };
        this.insertToDatabase(log);
    };
    /**
     * Creates info log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    Logger.prototype.info = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        var log = {
            title: title,
            message: message,
            type: 'Info',
            data: data,
            time: new Date()
        };
        this.insertToDatabase(log);
    };
    /**
     * Creates error log.
     * @param title Title of the log.
     * @param message Message of the log.
     * @param data Data of the log.
     */
    Logger.prototype.error = function (title, message, data) {
        if (title === void 0) { title = null; }
        if (message === void 0) { message = null; }
        if (data === void 0) { data = null; }
        var log = {
            title: title,
            message: message,
            type: 'Error',
            data: data,
            time: new Date()
        };
        this.insertToDatabase(log);
    };
    //#endregion
    //#region Private Methods
    Logger.prototype.insertToDatabase = function (log) {
        LoggerModel_1.default.collection.insert(log, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    return Logger;
}());
exports.Logger = Logger;
