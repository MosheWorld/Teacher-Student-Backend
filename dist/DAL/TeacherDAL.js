"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var logger_1 = require("./../LogService/logger");
var TeacherModel_1 = require("../Models/TeacherModel");
var TeacherDal = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function TeacherDal() {
        this.logger = new logger_1.Logger();
    }
    //#endregion
    //#region Public Methods
    TeacherDal.prototype.GetAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL GetAll");
            var teachersCollection = TeacherModel_1.default.find({}, function (error, teachers) {
                if (error) {
                    reject("Error occurred when gettings all Teachers from database.");
                }
                return teachers ? teachers : null;
            });
            resolve(teachersCollection);
        });
    };
    TeacherDal.prototype.GetByID = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL GetAll", { id: id });
            var teacher = TeacherModel_1.default.findOne({ _id: new mongodb_1.ObjectID(id) }, function (error, teacher) {
                if (error) {
                    reject("Error occurred when gettings teacher from database.");
                }
                return teacher ? teacher : null;
            });
            resolve(teacher);
        });
    };
    TeacherDal.prototype.Create = function (teacherData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL Create", teacherData);
            TeacherModel_1.default.collection.insert(teacherData, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Teacher Create database.");
                }
                resolve(teacherData._id);
            });
        });
    };
    TeacherDal.prototype.DeleteByID = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL DeleteByID", { id: id });
            TeacherModel_1.default.collection.deleteOne({ _id: new mongodb_1.ObjectID(id) }, function (error) {
                if (error) {
                    reject("Error occurred when deleteing teacher from database.");
                }
                resolve();
            });
        });
    };
    TeacherDal.prototype.UpdateRecommendations = function (id, recommendData, rateData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL UpdateRecommendations", { id: id, recommendData: recommendData, rateData: rateData });
            TeacherModel_1.default.collection.updateOne({ _id: id }, {
                $set: { "recommendations": recommendData, "rate": rateData },
            }, function (error) {
                if (error) {
                    reject("Error occurred when updating recommendation at database.");
                }
                resolve();
            });
        });
    };
    TeacherDal.prototype.UpdateImage = function (id, imagePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Teacher", "DAL UpdateImage", { id: id, image: imagePath });
            TeacherModel_1.default.collection.updateOne({ _id: id }, {
                $set: { "image": imagePath },
            }, function (error) {
                if (error) {
                    reject("Error occurred when updating imagePath at database.");
                }
                resolve();
            });
        });
    };
    return TeacherDal;
}());
exports.TeacherDal = TeacherDal;
