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
var ImageDal_1 = require("./../DAL/ImageDal");
var ImageLogic = /** @class */ (function () {
    function ImageLogic() {
    }
    //#region Public Methods
    /**
     * Receives image by ID in database.
     * @param imageID Image ID.
     * @returns {Promise<any>} Image returned from database.
     */
    ImageLogic.prototype.GetImageByID = function (imageID) {
        return __awaiter(this, void 0, void 0, function () {
            var iManager, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iManager = new ImageDal_1.ImageDal();
                        return [4 /*yield*/, iManager.GetImageByID(imageID)];
                    case 1:
                        image = _a.sent();
                        return [2 /*return*/, image];
                }
            });
        });
    };
    /**
     * Create new image at database related to some teacher.
     * @param TeacherIDImage Teacher model ( Will be added as interface in future ).
     * @returns {Promise<ObjectID>} Returns image ID of new image from database.
     */
    ImageLogic.prototype.Create = function (teacherIDImage) {
        return __awaiter(this, void 0, void 0, function () {
            var iManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iManager = new ImageDal_1.ImageDal();
                        return [4 /*yield*/, iManager.Create(teacherIDImage)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Remove image from database.
     * @param id ID to remove, Nullable string.
     */
    ImageLogic.prototype.DeleteByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var iManager;
            return __generator(this, function (_a) {
                iManager = new ImageDal_1.ImageDal();
                iManager.DeleteByID(id);
                return [2 /*return*/];
            });
        });
    };
    return ImageLogic;
}());
exports.ImageLogic = ImageLogic;
