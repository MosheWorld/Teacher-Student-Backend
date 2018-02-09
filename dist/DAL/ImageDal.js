"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var ImageModel_1 = require("../Models/ImageModel");
var ImageDal = /** @class */ (function () {
    function ImageDal() {
    }
    //#region Public Methods
    /**
     * Return image by image ID at database.
     * @param {string} imageID
     */
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
    /**
     * Creates new image at database
     * @param TeacherIDImage
     */
    ImageDal.prototype.Create = function (TeacherIDImage) {
        return new Promise(function (resolve, reject) {
            ImageModel_1.default.collection.insert(TeacherIDImage, function (error) {
                if (error) {
                    reject("Error occurred when creating new entity for image at database.");
                }
                resolve(TeacherIDImage._id);
            });
        });
    };
    /**
     * Remove image from database according to ID.
     * @param id Image ID.
     */
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
