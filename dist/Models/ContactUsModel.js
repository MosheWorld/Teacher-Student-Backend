"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ContactUsSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactReason: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });
var ContactUsrModel = mongoose.model("ContactUs", ContactUsSchema);
exports.default = ContactUsrModel;
