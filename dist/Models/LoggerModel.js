"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var LoggerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: String },
    time: { type: Date, required: true }
}, { timestamps: true });
var LoggerModel = mongoose.model("Logger", LoggerSchema);
exports.default = LoggerModel;
