"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var IPSchema = new mongoose.Schema({
    ip: { type: String },
    ips: { type: [] },
    date: { type: String }
}, { timestamps: true });
var IPModel = mongoose.model("IP", IPSchema);
exports.default = IPModel;
