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
var lodash_1 = require("lodash");
var TeacherDAL_1 = require("./../DAL/TeacherDAL");
var TeachesAt_Enum_1 = require("../Enums/TeachesAt.Enum");
var TeacherLogic = /** @class */ (function () {
    function TeacherLogic() {
    }
    TeacherLogic.prototype.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, teacherCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
            var tDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.Create(teacherData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeacherLogic.prototype.Delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.DeleteByID(id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TeacherLogic.prototype.SearchTeacher = function (searchData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var teacherCollection, teacherCollectionToReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetAll()];
                    case 1:
                        teacherCollection = _a.sent();
                        teacherCollectionToReturn = [];
                        teacherCollection.forEach(function (element) {
                            // Teaches institutions check.
                            if (lodash_1._.includes(element.teachesInstitutions, searchData.teachesInstitutions)) {
                                // Price check.
                                if (_this.IsNumberInRange(element.priceFrom, element.priceTo, searchData.fromPrice, searchData.toPrice)) {
                                    // Gender check.
                                    if (_this.IsGenderMatch(element.gender, searchData.gender)) {
                                        // Teaches At check.
                                        if (_this.IsTeachesAtMatch(element.teachesAt, searchData.teachesAt)) {
                                            teacherCollectionToReturn.push(element);
                                        }
                                    }
                                }
                            }
                        });
                        return [2 /*return*/, teacherCollectionToReturn];
                }
            });
        });
    };
    TeacherLogic.prototype.AddRecommendToExistingTeacher = function (id, recommendData) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, currentTeacher, recommendCollection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, this.GetByID(id)];
                    case 1:
                        currentTeacher = _a.sent();
                        if (currentTeacher == null || currentTeacher._id == null) {
                            throw new Error("User not found.");
                        }
                        recommendCollection = currentTeacher.recommendations;
                        recommendCollection.push(recommendData);
                        return [2 /*return*/, tDal.UpdateRecommendations(currentTeacher._id, recommendCollection)];
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
    TeacherLogic.prototype.IsNumberInRange = function (lowerRange1, upperRange1, lowerRange2, upperRange2) {
        // Checks if second range is inside the first range.
        if (lowerRange1 <= lowerRange2 && upperRange1 >= upperRange2) {
            return true;
        }
        else if (lowerRange1 >= lowerRange2 && lowerRange1 <= upperRange2 && upperRange1 >= upperRange2) {
            return true;
        }
        else if (lowerRange1 <= lowerRange2 && upperRange1 >= lowerRange2 && upperRange1 <= upperRange2) {
            return true;
        }
        else {
            return false;
        }
    };
    TeacherLogic.prototype.IsGenderMatch = function (genderTeacher, genderSearch) {
        var isGenderOkay = false;
        switch (genderSearch) {
            case '':
                isGenderOkay = true;
                break;
            case 'Male':
                isGenderOkay = genderTeacher === 'Male' || genderTeacher === '' ? true : false;
                break;
            case 'Female':
                isGenderOkay = genderTeacher === 'Female' || genderTeacher === '' ? true : false;
                break;
            default:
                isGenderOkay = false;
                break;
        }
        return isGenderOkay;
    };
    TeacherLogic.prototype.IsTeachesAtMatch = function (teachesAtTeacher, teachesAtSearch) {
        var isGenderOkay = false;
        switch (teachesAtSearch) {
            case TeachesAt_Enum_1.TeachesAt.Both:
                isGenderOkay = true;
                break;
            case TeachesAt_Enum_1.TeachesAt.Home:
                isGenderOkay = teachesAtTeacher === TeachesAt_Enum_1.TeachesAt.Home || teachesAtTeacher === TeachesAt_Enum_1.TeachesAt.Both ? true : false;
                break;
            case TeachesAt_Enum_1.TeachesAt.AcademicInstitution:
                isGenderOkay = teachesAtTeacher === TeachesAt_Enum_1.TeachesAt.AcademicInstitution || teachesAtTeacher === TeachesAt_Enum_1.TeachesAt.Both ? true : false;
                break;
            default:
                isGenderOkay = false;
                break;
        }
        return isGenderOkay;
    };
    return TeacherLogic;
}());
exports.TeacherLogic = TeacherLogic;
