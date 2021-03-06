"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var ImageLogic_1 = require("../Logic/ImageLogic");
var ValidationAbstract_1 = require("../Abstracts/ValidationAbstract");
//#region Members
var router = express_1.Router();
var logger = new logger_1.Logger();
//#endregion
//#region Routers
/**
 * Receives image ID to database and receives the image from the database.
 */
router.get('/getimagebyid/:imagePath', function (req, res) {
    try {
        logger.debug("Enter Image", "Router image/getimagebyid");
        var imageID = req.params.imagePath;
        if (ValidationAbstract_1.IsStringNullOrEmpty(imageID)) {
            logger.error("Model is not valid.", "image/getimagebyid");
            res.status(400).send("Model is not valid.");
        }
        var iManager = new ImageLogic_1.ImageLogic();
        iManager.GetImageByID(imageID)
            .then(function (image) {
            res.json(image);
        }).catch(function (error) {
            res.status(400).send(error.message);
        });
        logger.info("Out", "image/getimagebyid");
    }
    catch (ex) {
        logger.error("Out", "image/getimagebyid", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion
exports.ImageController = router;
