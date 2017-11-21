"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("./../LogService/logger");
var ImageLogic_1 = require("../Logic/ImageLogic");
var router = express_1.Router();
var logger = new logger_1.Logger();
router.post('/getimagebyid', function (req, res) {
    try {
        logger.info("Enter", "image/getimagebyid");
        var imageID = req.body.imagePath;
        if (imageID == null || imageID == "") {
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
exports.ImageController = router;
