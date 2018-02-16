"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var RecommendationSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    fullName: { type: String, required: true },
    teacherID: { type: String, required: true }
}, { timestamps: true });
var RecommendationModel = mongoose.model("Recommendation", RecommendationSchema);
exports.default = RecommendationModel;
