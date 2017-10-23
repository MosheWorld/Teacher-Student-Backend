"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var TeacherSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
}, { timestamps: true });
var TeacherModel = mongoose.model("Teacher", TeacherSchema);
exports.default = TeacherModel;
