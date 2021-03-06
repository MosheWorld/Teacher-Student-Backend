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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var AuthLogic_1 = require("../Logic/AuthLogic");
var logger_1 = require("./../LogService/logger");
var Role_Enum_1 = require("./../Enums/Role.Enum");
var ValidationAbstract_1 = require("../Abstracts/ValidationAbstract");
//#region Members
var logger = new logger_1.Logger();
//#endregion
//#region Middleware
/**
 * Middleware for functions that require to get authenticated users.
 * Returns 401 ( unauthorized) if user token is not valid.
 * @param req
 * @param res
 * @param next
 */
var UserMiddleware = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, provider, currentUser, error_1, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                logger.debug("Enter User Middleware");
                token = req.header('x-auth');
                provider = req.header('provider');
                if (ValidationAbstract_1.IsObjectNullOrUndefined(token) || ValidationAbstract_1.IsObjectNullOrUndefined(provider)) {
                    logger.error("Middleware found bad token or provider.", "Token is not valid or provider is not valid.", { token: token, provider: provider });
                    res.status(401).send("Given token or provider is not valid.");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, GetUserByTokenAndProvider(token, provider)];
            case 2:
                currentUser = _a.sent();
                process["currentUser"] = currentUser;
                logger.info("User logged in.", "User logged in.", currentUser);
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(401).json(error_1);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                ex_1 = _a.sent();
                logger.error("Something went wrong at middleware, aborting.");
                res.status(400).send("Something went wrong at middleware when validating token.");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.UserMiddleware = UserMiddleware;
/**
 * Middleware for functions that require to get authenticated users.
 * Returns 401 ( unauthorized) if user token is not valid or role is does not fit to requirements.
 * @param req
 * @param res
 * @param next
 */
var AdminMiddleware = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, provider, currentUser, error_2, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                logger.debug("Enter User Middleware");
                token = req.header('x-auth');
                provider = req.header('provider');
                if (ValidationAbstract_1.IsObjectNullOrUndefined(token) || ValidationAbstract_1.IsObjectNullOrUndefined(provider)) {
                    logger.error("Middleware found bad token or provider.", "Token is not valid or provider is not valid.", { token: token, provider: provider });
                    res.status(401).send("Given token or provider is not valid.");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, GetUserByTokenAndProvider(token, provider)];
            case 2:
                currentUser = _a.sent();
                if (currentUser.role !== Role_Enum_1.RoleEnum.Admin) {
                    logger.error("Non Admin token tried to access security zone.", "", { token: token, provider: provider });
                    res.status(401).send("You're not admin, access denied.");
                }
                process["currentUser"] = currentUser;
                logger.info("Admin logged in.", "Admin logged in.", currentUser);
                next();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(401).json(error_2);
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                ex_2 = _a.sent();
                logger.error("Something went wrong at middleware, aborting.");
                res.status(400).send("Something went wrong at middleware when validating token.");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.AdminMiddleware = AdminMiddleware;
/**
 * Receives user ID from token and provider by taking to their API.
 * Receives the user from database and returns his details.
 * @param token
 * @param provider
 */
var GetUserByTokenAndProvider = function (token, provider) { return __awaiter(_this, void 0, void 0, function () {
    var aManager, userID, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aManager = new AuthLogic_1.AuthLogic();
                return [4 /*yield*/, aManager.GetUserIDByTokenFromProvider(token, provider)];
            case 1:
                userID = _a.sent();
                return [4 /*yield*/, aManager.GetUserByID(userID)];
            case 2:
                currentUser = _a.sent();
                return [2 /*return*/, currentUser];
        }
    });
}); };
