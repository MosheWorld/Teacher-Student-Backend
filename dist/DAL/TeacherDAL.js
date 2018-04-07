"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var TeacherModel_1 = require("../DatabaseModels/TeacherModel");
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
     * Receives teacher by his object ID.
     * @param id Teacher object ID as string.
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
     * Returns user by his userID.
     * @param id userID variable.
     */
    TeacherDal.prototype.GetByUserID = function (userID) {
        return new Promise(function (resolve, reject) {
            var teacher = TeacherModel_1.default.findOne({ userID: userID }, function (error, teacher) {
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
     * Remove teacher from database by his user ID.
     * @param id Teacher ID.
     */
    TeacherDal.prototype.DeleteByUserID = function (userID) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.collection.deleteOne({ userID: userID }, function (error) {
                if (error) {
                    reject("Error occurred when deleteing teacher from database.");
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
    /**
     * Updates rate for the teacher.
     * @param teacherID string.
     * @param newRate number.
     */
    TeacherDal.prototype.UpdateRate = function (teacherID, newRate) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.collection.updateOne({ _id: new mongodb_1.ObjectID(teacherID) }, { $set: { "rate": newRate }, }, function (error) {
                if (error) {
                    reject("Error occurred when updating rate for teacher at database.");
                }
                resolve();
            });
        });
    };
    /**
     * Receives ID of teacher and ID of new recommendations and adds it to teacher recommendations list.
     * @param teacherID String.
     * @param newRecommendationID ObjectID.
     */
    TeacherDal.prototype.AddRecommendationID = function (teacherID, newRecommendationID) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.findOne({ _id: new mongodb_1.ObjectID(teacherID) }, function (error, teacher) {
                if (error) {
                    reject("Error occurred when gettings teacher from database.");
                }
                var recommendationsList = teacher.recommendations;
                recommendationsList.push(newRecommendationID.toString());
                TeacherModel_1.default.collection.updateOne({ _id: new mongodb_1.ObjectID(teacherID) }, { $set: { "recommendations": recommendationsList }, }, function (error) {
                    if (error) {
                        reject("Error occurred when updating recommendations for teacher at database.");
                    }
                    resolve();
                });
            });
        });
    };
    /**
     * Searches teacher by given user ID.
     * @param id User ID in teacher database model.
     */
    TeacherDal.prototype.GetTeacherByUserID = function (id) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.findOne({ userID: id }, function (error, teacher) {
                if (error) {
                    reject("Error occurred when gettings teacher from database by user ID.");
                }
                if (teacher === null || teacher === undefined) {
                    resolve(null);
                }
                else {
                    resolve(teacher);
                }
            });
        });
    };
    /**
     * Updates teacher model at database.
     * @param model
     */
    TeacherDal.prototype.UpdateTeacherByUserID = function (model) {
        return new Promise(function (resolve, reject) {
            TeacherModel_1.default.findOne({ userID: model.userID }, function (error, teacher) {
                if (error) {
                    reject("Error occurred when gettings teacher from database by user ID.");
                }
                // Not found teacher by given user ID.
                if (teacher === null || teacher === undefined) {
                    reject("No teacher exist by given user ID, aborting.");
                }
                // Found user, we will update the relevant fields.
                TeacherModel_1.default.collection.updateOne({ userID: model.userID }, {
                    $set: {
                        "age": model.age,
                        "phone": model.phone,
                        "email": model.email,
                        "priceTo": model.priceTo,
                        "priceFrom": model.priceFrom,
                        "lastName": model.lastName,
                        "firstName": model.firstName,
                        "personalMessage": model.personalMessage
                    },
                }, function (error) {
                    if (error) {
                        reject("Error occurred when updating teacher at database.");
                    }
                    resolve();
                });
            });
        });
    };
    return TeacherDal;
}());
exports.TeacherDal = TeacherDal;
