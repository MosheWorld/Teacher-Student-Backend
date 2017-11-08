"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var TeacherSchema = new mongoose.Schema({
    priceTo: { type: Number, required: true, min: 0 },
    teachesAt: { type: Number, required: true, min: 0 },
    rate: { type: Number, required: true, min: 0, max: 5 },
    age: { type: Number, required: true, min: 0, max: 120 },
    priceFrom: { type: Number, required: true, min: 0, max: 200 },
    image: { type: String },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    personalMessage: { type: String, required: true },
    phone: { type: String, required: true, minlength: 9 },
    teachesInstitutions: { type: [], required: true },
    recommendations: { type: [], required: true }
}, { timestamps: true });
var TeacherModel = mongoose.model("Teacher", TeacherSchema);
exports.default = TeacherModel;
