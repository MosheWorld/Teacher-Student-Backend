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
var AuthDal_1 = require("./../DAL/AuthDal");
var TeacherDal_1 = require("./../DAL/TeacherDal");
var GoogleVerifier_1 = require("./../Integration/GoogleVerifier");
var FacebookVerifier_1 = require("../Integration/FacebookVerifier");
var AuthLogic = /** @class */ (function () {
    function AuthLogic() {
    }
    //#region Public Methods
    /**
     * Creates new user at database, also verify the token and validate provider to get the right details.
     * @param user User Model.
     */
    AuthLogic.prototype.CreateNewUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var aDal, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aDal = new AuthDal_1.AuthDal();
                        return [4 /*yield*/, this.IsTokenValid(user.provider, user.authToken)];
                    case 1:
                        isValid = _a.sent();
                        if (isValid === true) {
                            aDal.CreateNewUser(user);
                        }
                        else {
                            throw new Error("Given token is not valid, aborting.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Validates whether user exists in database.
     * If the user exists, we will return json with data:
     * exist: {boolean} , role: {His role from database}
     * @param userExists User details to check.
     */
    AuthLogic.prototype.DoesUserExistsByID = function (userExistsModel) {
        return __awaiter(this, void 0, void 0, function () {
            var aDal, isValid, prepairModelToReturn, userFromDatabase, tDal, userExistInDataBase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aDal = new AuthDal_1.AuthDal();
                        return [4 /*yield*/, this.IsTokenValid(userExistsModel.provider, userExistsModel.token)];
                    case 1:
                        isValid = _a.sent();
                        if (isValid === false) {
                            throw new Error("Given token is not valid, aborting.");
                        }
                        prepairModelToReturn = {
                            exist: false,
                            role: 1,
                            filledTeacherForm: false
                        };
                        return [4 /*yield*/, aDal.GetUserByID(userExistsModel.id)];
                    case 2:
                        userFromDatabase = _a.sent();
                        if (!(userFromDatabase === null)) return [3 /*break*/, 3];
                        return [2 /*return*/, prepairModelToReturn];
                    case 3:
                        tDal = new TeacherDal_1.TeacherDal();
                        return [4 /*yield*/, tDal.GetTeacherByUserID(userExistsModel.id)];
                    case 4:
                        userExistInDataBase = _a.sent();
                        if (userExistInDataBase === null || userExistInDataBase === undefined) {
                            return [2 /*return*/, prepairModelToReturn];
                        }
                        // User exist and his details in database as teacher exist, we will take him to details page.
                        prepairModelToReturn.exist = true;
                        prepairModelToReturn.role = userFromDatabase.role;
                        aDal.UpdateTokenToUserByID(userExistsModel.id, userExistsModel.token);
                        return [2 /*return*/, prepairModelToReturn];
                }
            });
        });
    };
    /**
     * Receives model from prodiver API as given on token and returns the specific ID of user.
     * @param token Given token.
     * @param provider Provider of the token.
     */
    AuthLogic.prototype.GetUserIDByTokenFromProvider = function (token, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fVerifier, userDataByFacebook, gVerifier, userDataByGoogle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = provider;
                        switch (_a) {
                            case "FACEBOOK": return [3 /*break*/, 1];
                            case "GOOGLE": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        fVerifier = new FacebookVerifier_1.FacebookVerifier();
                        return [4 /*yield*/, fVerifier.GetUserIDByToken(token)];
                    case 2:
                        userDataByFacebook = _b.sent();
                        return [2 /*return*/, userDataByFacebook.data.user_id];
                    case 3:
                        gVerifier = new GoogleVerifier_1.GoogleVerifier();
                        return [4 /*yield*/, gVerifier.GetUserIDByToken(token)];
                    case 4:
                        userDataByGoogle = _b.sent();
                        return [2 /*return*/, userDataByGoogle.sub];
                    case 5: throw new Error("No provider found.");
                }
            });
        });
    };
    /**
     * Gets the current user by given ID ( NOT UUID ).
     * @param id
     */
    AuthLogic.prototype.GetUserByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var aDal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aDal = new AuthDal_1.AuthDal();
                        return [4 /*yield*/, aDal.GetUserByID(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Updates user information at database.
     * @param model
     */
    AuthLogic.prototype.UpdateUser = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var aDal;
            return __generator(this, function (_a) {
                aDal = new AuthDal_1.AuthDal();
                aDal.UpdateUser(model);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Removes user by userID.
     * @param userID
     */
    AuthLogic.prototype.DeleteByUserID = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var aDal;
            return __generator(this, function (_a) {
                aDal = new AuthDal_1.AuthDal();
                aDal.DeleteByUserID(userID);
                return [2 /*return*/];
            });
        });
    };
    //#endregion
    //#region Private Methods
    /**
     * Validates whether the token is valid according to provider and token given.
     * @param provider Provider of the token.
     * @param token Given token.
     */
    AuthLogic.prototype.IsTokenValid = function (provider, token) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid, _a, fVerifier, gVerifier;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isValid = false;
                        _a = provider;
                        switch (_a) {
                            case "FACEBOOK": return [3 /*break*/, 1];
                            case "GOOGLE": return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        fVerifier = new FacebookVerifier_1.FacebookVerifier();
                        return [4 /*yield*/, fVerifier.IsTokenValid(token)];
                    case 2:
                        isValid = _b.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        gVerifier = new GoogleVerifier_1.GoogleVerifier();
                        return [4 /*yield*/, gVerifier.IsTokenValid(token)];
                    case 4:
                        isValid = _b.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("No provider found.");
                    case 6: return [2 /*return*/, isValid];
                }
            });
        });
    };
    return AuthLogic;
}());
exports.AuthLogic = AuthLogic;
