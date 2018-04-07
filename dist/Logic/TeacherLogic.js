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
var AuthDal_1 = require("../DAL/AuthDal");
var ImageLogic_1 = require("./ImageLogic");
var TeacherDAL_1 = require("./../DAL/TeacherDAL");
var Emailer_1 = require("./../Integration/Emailer");
var TeachesAt_Enum_1 = require("../Enums/TeachesAt.Enum");
var TeacherLogic = /** @class */ (function () {
    function TeacherLogic() {
    }
    //#region Public Methods
    /**
     * Returns all teachers.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
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
    /**
     * Returns teacher by his ID.
     * @param id Teacher ID.
     * @returns {Promise<any>} Teacher Model.
     */
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
    // Add model inside this function.
    /**
     * Creates new teacher at database and new image at images database.
     * Pass the responsibility to image logic to insert new image.
     * @param {TeacherInterface} teacherModel Teacher model.
     */
    TeacherLogic.prototype.Create = function (teacherModel) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, iManager, aDal, image, teacherObjectID, newImageObject, imageObjectID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        iManager = new ImageLogic_1.ImageLogic();
                        aDal = new AuthDal_1.AuthDal();
                        image = teacherModel.image;
                        teacherModel.image = undefined;
                        return [4 /*yield*/, tDal.Create(teacherModel)];
                    case 1:
                        teacherObjectID = _a.sent();
                        newImageObject = {
                            image: image,
                            teacherID: new mongodb_1.ObjectID(teacherObjectID)
                        };
                        return [4 /*yield*/, iManager.Create(newImageObject)];
                    case 2:
                        imageObjectID = _a.sent();
                        // Those three functions runs in parallel to increase performance.
                        this.SendEmails(teacherModel);
                        tDal.UpdateImage(teacherObjectID, imageObjectID.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Removes teacher by his ID.
     * Removes the teacher image from the database by transferring the responsibility to remove to image logic class.
     * @param id Teacher ID.
     */
    TeacherLogic.prototype.DeleteByUserID = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, iManager, teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        iManager = new ImageLogic_1.ImageLogic();
                        return [4 /*yield*/, tDal.GetByUserID(userID)];
                    case 1:
                        teacher = _a.sent();
                        // Run in parallel, no dependency between functions.
                        tDal.DeleteByUserID(userID);
                        iManager.DeleteByID(teacher.image);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Searches for teachers by specific requirements of search model.
     * @param {SearchTeacherInterface} searchTeacherModel Search model.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
    TeacherLogic.prototype.SearchTeacher = function (searchTeacherModel) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        query = this.BuildSearchQuery(searchTeacherModel);
                        return [4 /*yield*/, tDal.SearchTeacher(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Receives list of teachers by their ID.
     * @param {string[]} listOfTeacherID List of IDs.
     * @returns {Promise<TeacherInterface[]>} Teacher model.
     */
    TeacherLogic.prototype.GetListOfTeachersByID = function (listOfTeacherID) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal, teacherListToReturn, _i, listOfTeacherID_1, id, teacher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tDal = new TeacherDAL_1.TeacherDal();
                        teacherListToReturn = [];
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
    /**
     * Receives teacher by given UserID.
     * @param id
     */
    TeacherLogic.prototype.GetTeacherByUserID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (id === null || id === undefined) {
                            throw new Error("Given ID is not valid.");
                        }
                        tDal = new TeacherDAL_1.TeacherDal();
                        return [4 /*yield*/, tDal.GetTeacherByUserID(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates teacher model at database.
     * @param model
     */
    TeacherLogic.prototype.UpdateTeacherByUserID = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var tDal;
            return __generator(this, function (_a) {
                tDal = new TeacherDAL_1.TeacherDal();
                tDal.UpdateTeacherByUserID(model);
                return [2 /*return*/];
            });
        });
    };
    //#endregion
    //#region Private Methods
    /**
     * Function to build search query, builder parameters for search dynamically.
     * @param searchTeacherModel Search model.
     * @returns Returns the json built for search query for Mongo database.
     */
    TeacherLogic.prototype.BuildSearchQuery = function (searchTeacherModel) {
        var entityToDataBase = {
            priceFrom: { $lt: searchTeacherModel.toPrice },
            gender: this.GetGenderQuery(searchTeacherModel.gender),
            teachesAt: this.GetTeachesAtQuery(searchTeacherModel.teachesAt),
            teachesSubjects: this.GetIncludesArrayQuery(searchTeacherModel.teachesSubjects),
            teachesInstitutions: this.GetIncludesArrayQuery(searchTeacherModel.teachesInstitutions)
        };
        return entityToDataBase;
    };
    /**
     * Receives data that MongoDB requires for query.
     * @param data Should be TeachesSubjectsInterface or TeachesInstitutionsInterface.
     * @returns Returns the json built for search query for Mongo database.
     */
    TeacherLogic.prototype.GetIncludesArrayQuery = function (data) {
        if (data == null) {
            return { $gt: 0 };
        }
        else {
            return data;
        }
    };
    /**
     * Receives data that MongoDB requires for query.
     * @param {TeachesAtEnum} data See interface for more information.
     * @returns Returns the json built for search query for Mongo database.
     */
    TeacherLogic.prototype.GetTeachesAtQuery = function (data) {
        if (data == null || data == TeachesAt_Enum_1.TeachesAtEnum.Both) {
            return { $gt: 0 };
        }
        else {
            return { $in: [data, 3] };
        }
    };
    /**
     * Receives data that MongoDB requires for query.
     * @param data Number for gender decision.
     * @returns Returns the json built for search query for Mongo database.
     */
    TeacherLogic.prototype.GetGenderQuery = function (data) {
        if (data == null || data === 3) {
            return { $gt: 0 };
        }
        else {
            return data;
        }
    };
    /**
     * Sends email to teacher and the owner of the application when new teacher joines.
     * @param teacherModel Teacher model.
     * @prop {Emailer} Email Email class to send emails.
     */
    TeacherLogic.prototype.SendEmails = function (teacherModel) {
        return __awaiter(this, void 0, void 0, function () {
            var eManager;
            return __generator(this, function (_a) {
                eManager = new Emailer_1.Emailer();
                eManager.SendEmailToTeacherAsync('Welcome new teacher ✔', teacherModel);
                eManager.SendEmailToOwnerAsync('New teacher has joined ✔', teacherModel);
                return [2 /*return*/];
            });
        });
    };
    return TeacherLogic;
}());
exports.TeacherLogic = TeacherLogic;
