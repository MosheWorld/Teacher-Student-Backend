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
var mongodb_1 = require("mongodb");
var logger_1 = require("./../LogService/logger");
var TeacherModel_1 = require("../Models/TeacherModel");
var TeacherDal = /** @class */ (function () {
    function TeacherDal() {
        this.logger = new logger_1.Logger();
    }
    TeacherDal.prototype.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var teachersCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "DAL GetAll");
                        return [4 /*yield*/, TeacherModel_1.default.find({}, function (error, teachers) {
                                return teachers ? teachers : null;
                            }).catch(function (error) {
                                return error.message;
                            })];
                    case 1:
                        teachersCollection = _a.sent();
                        return [2 /*return*/, teachersCollection];
                }
            });
        });
    };
    TeacherDal.prototype.GetByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "DAL GetAll", { id: id });
                        return [4 /*yield*/, TeacherModel_1.default.findOne({ _id: new mongodb_1.ObjectID(id) })];
                    case 1:
                        teacher = _a.sent();
                        return [2 /*return*/, teacher];
                }
            });
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
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "DAL DeleteByID", { id: id });
                        return [4 /*yield*/, TeacherModel_1.default.collection.deleteOne({ _id: new mongodb_1.ObjectID(id) })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TeacherDal.prototype.UpdateRecommendations = function (id, recommendData, rateData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.debug("Enter Teacher", "DAL UpdateRecommendations", { id: id, recommendData: recommendData, rateData: rateData });
                TeacherModel_1.default.collection.updateOne({ _id: id }, {
                    $set: { "recommendations": recommendData, "rate": rateData },
                });
                return [2 /*return*/];
            });
        });
    };
    TeacherDal.prototype.UpdateImage = function (id, imagePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.debug("Enter Teacher", "DAL UpdateImage", { id: id, image: imagePath });
                TeacherModel_1.default.collection.updateOne({ _id: id }, {
                    $set: { "image": imagePath },
                });
                return [2 /*return*/];
            });
        });
    };
    return TeacherDal;
}());
exports.TeacherDal = TeacherDal;
