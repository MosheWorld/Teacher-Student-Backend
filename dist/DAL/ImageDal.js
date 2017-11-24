"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var logger_1 = require("./../LogService/logger");
var ImageModel_1 = require("../Models/ImageModel");
var ImageDal = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function ImageDal() {
        this.logger = new logger_1.Logger();
    }
    //#endregion
    //#region Public Methods
    ImageDal.prototype.GetImageByID = function (imageID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Image", "DAL GetImageByID", { imageID: imageID });
            var image = ImageModel_1.default.findOne({ _id: new mongodb_1.ObjectID(imageID) }, function (error, image) {
                if (error) {
                    reject("Error occurred when getting image by ID from database.");
                }
                return image ? image : null;
            });
            resolve(image);
        });
    };
    ImageDal.prototype.Create = function (TeacherIDImage) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.logger.debug("Enter Create", "DAL Create", TeacherIDImage);
            ImageModel_1.default.collection.insert(TeacherIDImage, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Teacher Create database.");
                }
                resolve(TeacherIDImage._id);
            });
        });
    };
    return ImageDal;
}());
exports.ImageDal = ImageDal;
