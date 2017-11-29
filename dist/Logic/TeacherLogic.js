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
var SendEmailTo_Enum_1 = require("./../Enums/SendEmailTo.Enum");
var mongodb_1 = require("mongodb");
var ImageLogic_1 = require("./ImageLogic");
var logger_1 = require("./../LogService/logger");
var TeacherDAL_1 = require("./../DAL/TeacherDAL");
var Emailer_1 = require("./../Integration/Emailer");
var TeachesAt_Enum_1 = require("../Enums/TeachesAt.Enum");
var TeacherLogic = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function TeacherLogic() {
        this.logger = new logger_1.Logger();
    }
    //#endregion
    //#region Public Methods
    TeacherLogic.prototype.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, teacherCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic GetAll");
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.GetAll()];
                    case 1:
                        teacherCollection = _a.sent();
                        return [2 /*return*/, teacherCollection];
                }
            });
        });
    };
    TeacherLogic.prototype.GetByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic GetByID", id);
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.GetByID(id)];
                    case 1:
                        teacher = _a.sent();
                        return [2 /*return*/, teacher];
                }
            });
        });
    };
    TeacherLogic.prototype.Create = function (teacherData) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, iManager, image, teacherObjectID, newImageObject, imageObjectID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic Create", teacherData);
                        tDal = new TeacherDAL_1.TeacherDal();
                        iManager = new ImageLogic_1.ImageLogic();
                        image = teacherData.image;
                        teacherData.image = undefined;
                        return [4 /*yield*/, tDal.Create(teacherData)];
                    case 1:
                        teacherObjectID = _a.sent();
                        newImageObject = {
                            teacherID: new mongodb_1.ObjectID(teacherObjectID),
                            image: image
                        };
                        return [4 /*yield*/, iManager.Create(newImageObject)];
                    case 2:
                        imageObjectID = _a.sent();
                        // Those three functions runs in parallel to reduce performance.
                        this.SendEmailToTeacher(teacherData, 'Welcome new teacher ✔', SendEmailTo_Enum_1.SendEmailTo.Teacher);
                        this.SendEmailToTeacher(teacherData, 'New teacher has joined ✔', SendEmailTo_Enum_1.SendEmailTo.Owner);
                        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherLogic.prototype.DeleteByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, iManager, teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic Delete ", id);
                        tDal = new TeacherDAL_1.TeacherDal();
                        iManager = new ImageLogic_1.ImageLogic();
                        return [4 /*yield*/, this.GetByID(id)];
                    case 1:
                        teacher = _a.sent();
                        // Run in parallel, no dependency between functions.
                        tDal.DeleteByID(id);
                        iManager.DeleteByID(teacher.image);
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherLogic.prototype.SearchTeacher = function (searchData) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic SearchTeacher", searchData);
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.SearchTeacher(this.BuildSearchQuery(searchData))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TeacherLogic.prototype.AddRecommendToExistingTeacher = function (id, recommendData) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, currentTeacher, recommendCollection, newRate, _i, recommendCollection_1, recommend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic AddRecommendToExistingTeacher", { id: id, recommendData: recommendData });
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, this.GetByID(id)];
                    case 1:
                        currentTeacher = _a.sent();
                        if (currentTeacher == null || currentTeacher._id == null) {
                            throw new Error("User not found.");
                        }
                        recommendCollection = currentTeacher.recommendations;
                        recommendCollection.push(recommendData);
                        newRate = 0;
                        for (_i = 0, recommendCollection_1 = recommendCollection; _i < recommendCollection_1.length; _i++) {
                            recommend = recommendCollection_1[_i];
                            newRate += recommend.rate;
                        }
                        newRate = newRate / recommendCollection.length;
                        newRate = parseFloat((Math.round(newRate * 100) / 100).toFixed(2));
                        return [2 /*return*/, tDal.UpdateRecommendations(currentTeacher._id, recommendCollection, newRate)];
                }
            });
        });
    };
    TeacherLogic.prototype.GetListOfTeachersByID = function (listOfTeacherID) {
        return __awaiter(this, void 0, void 0, function () {
            var teacherListToReturn, tDal, _i, listOfTeacherID_1, id, teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("Enter Teacher", "Logic GetListOfTeachersByID", { list: listOfTeacherID });
                        teacherListToReturn = [];
                        tDal = new TeacherDAL_1.TeacherDal();
                        _i = 0, listOfTeacherID_1 = listOfTeacherID;
                        _a.label = 1;
                    case 1:
                        if (!(_i < listOfTeacherID_1.length)) return [3 /*break*/, 4];
                        id = listOfTeacherID_1[_i];
                        return [4 /*yield*/, tDal.GetByID(id)];
                    case 2:
                        teacher = _a.sent();
                        teacherListToReturn.push(teacher);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, teacherListToReturn];
                }
            });
        });
    };
    //#endregion
    //#region Private Methods
    TeacherLogic.prototype.BuildSearchQuery = function (searchData) {
        return {
            gender: this.GetGenderQuery(searchData.gender),
            teachesInstitutions: this.GetIncludesArrayQuery(searchData.teachesInstitutions),
            teachesSubjects: this.GetIncludesArrayQuery(searchData.teachesSubjects),
            teachesAt: this.GetTeachesAtQuery(searchData.teachesAt),
            priceFrom: { $lt: searchData.toPrice }
        };
    };
    TeacherLogic.prototype.GetIncludesArrayQuery = function (data) {
        if (data == null) {
            return { $gt: 0 };
        }
        else {
            return data;
        }
    };
    TeacherLogic.prototype.GetTeachesAtQuery = function (data) {
        if (data == null || data == TeachesAt_Enum_1.TeachesAt.Both) {
            return { $gt: 0 };
        }
        else {
            return { $in: [data, 3] };
        }
    };
    TeacherLogic.prototype.GetGenderQuery = function (data) {
        if (data == null || data === 3) {
            return { $gt: 0 };
        }
        else {
            return data;
        }
    };
    TeacherLogic.prototype.SendEmailToTeacher = function (teacherData, subject, emailToEnum) {
        return __awaiter(this, void 0, void 0, function () {
            var eManager, body, email;
            return __generator(this, function (_a) {
                this.logger.debug("Enter Teacher", "Logic SendEmailToTeacher", { teacherData: teacherData, subject: subject, emailToEnum: emailToEnum });
                eManager = new Emailer_1.Emailer();
                body = "";
                email = "";
                if (emailToEnum == SendEmailTo_Enum_1.SendEmailTo.Teacher) {
                    body = '<div dir="ltr"></div>Hello ' + teacherData.firstName + ' ' + teacherData.lastName + ' and welcome to StudyHub.<br/> We hope you will find students from out application, improve your personal details and it will be fine.<br/>.<br/>Enjoy from StudyHub team and especially Moshe Binieli.<br/></div>';
                    email = teacherData.email;
                }
                else if (emailToEnum == SendEmailTo_Enum_1.SendEmailTo.Owner) {
                    body = 'Hey Moshe Binieli, new teacher has joined to your application, his name is ' + teacherData.firstName + ' ' + teacherData.lastName + ', you may see him at databases for more information, have a good day.';
                    email = "mmoshikoo@gmail.com";
                }
                eManager.SendEmailAsync(email, subject, body);
                return [2 /*return*/];
            });
        });
    };
    return TeacherLogic;
}());
exports.TeacherLogic = TeacherLogic;
