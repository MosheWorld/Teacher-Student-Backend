"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var ImageModel_1 = require("../Models/ImageModel");
var ImageDal = /** @class */ (function () {
    function ImageDal() {
    }
    //#region Public Methods
    ImageDal.prototype.GetImageByID = function (imageID) {
        return new Promise(function (resolve, reject) {
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
        return new Promise(function (resolve, reject) {
            ImageModel_1.default.collection.insert(TeacherIDImage, function (error) {
                if (error) {
                    reject("Error occurred when inserting to Teacher Create database.");
                }
                resolve(TeacherIDImage._id);
            });
        });
    };
    ImageDal.prototype.DeleteByID = function (id) {
        return new Promise(function (resolve, reject) {
            ImageModel_1.default.deleteOne({ _id: new mongodb_1.ObjectID(id) }, function (error) {
                if (error) {
                    reject("Error occurred when deleting image from database.");
                }
                resolve();
            });
        });
    };
    return ImageDal;
}());
exports.ImageDal = ImageDal;
