"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var RequestHttpSchema = new mongoose.Schema({
    ip: { type: String },
    path: { type: String },
    date: { type: String },
    method: { type: String },
    body: { type: String }
}, { timestamps: true });
var RequestHttpModel = mongoose.model("RequestHttp", RequestHttpSchema);
exports.default = RequestHttpModel;
