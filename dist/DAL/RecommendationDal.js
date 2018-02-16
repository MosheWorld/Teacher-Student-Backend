"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecommendationModel_1 = require("../Models/RecommendationModel");
var RecommendationDal = /** @class */ (function () {
    function RecommendationDal() {
    }
    //#region Public Methods
    /**
     * Returns list of all recommendations by given teacher ID.
     * @param teacherID Teacher ID.
     */
    RecommendationDal.prototype.GetRecommendationsByID = function (teacherID) {
        return new Promise(function (resolve, reject) {
            var recommendationList = RecommendationModel_1.default.find({ "teacherID": teacherID }, function (error, teachers) {
                if (error) {
                    reject("Error occurred when gettings all recommendation from database.");
                }
            });
            resolve(recommendationList);
        });
    };
    /**
     * Creates new recommendation at database and returns the ObjectD.
     * @param {RecommendationsInterface} model This is the type of this model.
     */
    RecommendationDal.prototype.Create = function (model) {
        return new Promise(function (resolve, reject) {
            RecommendationModel_1.default.collection.insert(model, function (error) {
                if (error) {
                    reject("Error occurred when creating new entity for recommendation at database.");
                }
                resolve(model._id);
            });
        });
    };
    return RecommendationDal;
}());
exports.RecommendationDal = RecommendationDal;
