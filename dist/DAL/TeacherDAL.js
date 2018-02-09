"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var TeacherModel_1 = require("../Models/TeacherModel");
var TeacherDal = /** @class */ (function () {
    function TeacherDal() {
    }
    //#region Public Methods
    /**
     * Receives all teachers from database.
     * @returns Array of teachers.
     */
    TeacherDal.prototype.GetAll = function () {
        return new Promise(function (resolve, reject) {
            var teachersCollection = TeacherModel_1.default.find({}, function (error, teachers) {
                if (error) {
                    reject("Error occurred when gettings all Teachers from database.");
                }
                return teachers ? teachers : null;
            });
            resolve(teachersCollection);
        });
    };
    /**
     * Receives teacher by his ID.
     * @param id Teacher ID.
     * @returns Single teacher.
     */
    TeacherDal.prototype.GetByID = function (id) {
        return new Promise(function (resolve, reject) {
            var teacher = TeacherModel_1.default.findOne({ _id: new mongodb_1.ObjectID(id) }, function (error, teacher) {
                if (error) {
                    reject("Error occurred when gettings teacher from database.");
                }
                return teacher ? teacher : null;
            });
            resolve(teacher);
        });
    };
    /**
     * Creates new teacher at database.
     * @param teacherData Teacher data.
     * @returns Returns new teacher ID as ObjectID.
     */
    TeacherDal.prototype.Create = function (teacherData) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.collection.insert(teacherData, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Teacher Create database.");
                }
                resolve(teacherData._id);
            });
        });
    };
    /**
     * Remove teacher from database by his ID.
     * @param id Teacher ID.
     */
    TeacherDal.prototype.DeleteByID = function (id) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.collection.deleteOne({ _id: new mongodb_1.ObjectID(id) }, function (error) {
                if (error) {
                    reject("Error occurred when deleteing teacher from database.");
                }
                resolve();
            });
        });
    };
    /**
     * Updates recommendation of teacher.
     * @param id Teacher ID.
     * @param recommendData
     * @param rateData New teacher rate.
     */
    TeacherDal.prototype.UpdateRecommendations = function (id, recommendData, rateData) {
        return new Promise(function (resolve, reject) {
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
    /**
     * Updates teacher image at database.
     * @param id Teacher ID.
     * @param imagePathNew image ID from image database.
     */
    TeacherDal.prototype.UpdateImage = function (id, imagePath) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.collection.updateOne({ _id: id }, { $set: { "image": imagePath }, }, function (error) {
                if (error) {
                    reject("Error occurred when updating imagePath at database.");
                }
                resolve();
            });
        });
    };
    /**
     * Searches for teacher according to given query.
     * @param query MongoDB query.
     * @return Teacher.
     */
    TeacherDal.prototype.SearchTeacher = function (query) {
        return new Promise(function (resolve, reject) {
            var teachers = TeacherModel_1.default.find(query, function (error, teachers) {
                if (error) {
                    reject("Error occurred when find teachers by query at database.");
                }
                return teachers ? teachers : null;
            });
            resolve(teachers);
        });
    };
    return TeacherDal;
}());
exports.TeacherDal = TeacherDal;
