"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ImageSchema = new mongoose.Schema({
    teacherID: { type: String, required: true },
    image: { type: String }
}, { timestamps: true });
var ImageModel = mongoose.model("Image", ImageSchema);
exports.default = ImageModel;
