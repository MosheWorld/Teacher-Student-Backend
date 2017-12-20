"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var FacebookUserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    lastName: { type: String },
    provider: { type: String },
    photoUrl: { type: String },
    firstName: { type: String },
    authToken: { type: String }
}, { timestamps: true });
var FacebookUserModel = mongoose.model("FacebookUser", FacebookUserSchema);
exports.default = FacebookUserModel;
