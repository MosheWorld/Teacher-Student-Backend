"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerModel_1 = require("../DatabaseModels/LoggerModel");
var LogDal = /** @class */ (function () {
    function LogDal() {
    }
    /**
     * Received logs list from database by amount given and page number given.
     * @param amount
     * @param page
     */
    LogDal.prototype.GetLogsByAmountAndPageNumber = function (amount, page) {
        return new Promise(function (resolve, reject) {
            var logCollection = LoggerModel_1.default.find({}, null, { skip: (amount * page), limit: amount }, function (error, logs) {
                if (error) {
                    reject("Error occurred when gettings all Logs from database.");
                }
                return logs ? logs : null;
            });
            resolve(logCollection);
        });
    };
    /**
     * Receives amount of entities from database.
     */
    LogDal.prototype.GetLogsCount = function () {
        return new Promise(function (resolve, reject) {
            LoggerModel_1.default.count({}, function (err, count) {
                resolve(count);
            });
        });
    };
    return LogDal;
}());
exports.LogDal = LogDal;
