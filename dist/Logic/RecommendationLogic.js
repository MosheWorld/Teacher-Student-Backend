"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TeacherDal_1 = require("./../DAL/TeacherDAL");
var RecommendationDal_1 = require("./../DAL/RecommendationDal");
var RecommendationLogic = /** @class */ (function () {
    function RecommendationLogic() {
    }
    //#region Public Methods
    /**
     * Returns list of all recommendations by given teacher ID.
     * @param teacherID Teacher ID.
     */
    RecommendationLogic.prototype.GetRecommendationsByID = function (teacherID) {
        return __awaiter(this, void 0, void 0, function () {
            var rMDal, recommendationsList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rMDal = new RecommendationDal_1.RecommendationDal();
                        return [4 /*yield*/, rMDal.GetRecommendationsByID(teacherID)];
                    case 1:
                        recommendationsList = _a.sent();
                        return [2 /*return*/, recommendationsList];
                }
            });
        });
    };
    /**
     * Creates new recommendation at database.
     * @param model
     */
    RecommendationLogic.prototype.Create = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var rMDal, createdRecommendationID, tDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rMDal = new RecommendationDal_1.RecommendationDal();
                        return [4 /*yield*/, rMDal.Create(model)];
                    case 1:
                        createdRecommendationID = _a.sent();
                        tDal = new TeacherDal_1.TeacherDal();
                        return [4 /*yield*/, tDal.AddRecommendationID(model.teacherID, createdRecommendationID)];
                    case 2:
                        _a.sent();
                        this.UpdateTeacherRate(model.teacherID);
                        return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region Private Methods
    /**
     * Updates rate for teacher at database.
     * @param teacherID Teacher ID as string.
     */
    RecommendationLogic.prototype.UpdateTeacherRate = function (teacherID) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendationsList, newRate, _i, recommendationsList_1, recommend, tDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetRecommendationsByID(teacherID)];
                    case 1:
                        recommendationsList = _a.sent();
                        newRate = 0;
                        for (_i = 0, recommendationsList_1 = recommendationsList; _i < recommendationsList_1.length; _i++) {
                            recommend = recommendationsList_1[_i];
                            newRate += recommend.rate;
                        }
                        newRate = newRate / recommendationsList.length;
                        newRate = parseFloat((Math.round(newRate * 100) / 100).toFixed(2));
                        tDal = new TeacherDal_1.TeacherDal();
                        return [4 /*yield*/, tDal.UpdateRate(teacherID, newRate)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RecommendationLogic;
}());
exports.RecommendationLogic = RecommendationLogic;
