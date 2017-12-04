"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    id: { type: String },
    token: { type: String }
}, { timestamps: true });
var UserModel = mongoose.model("User", UserSchema);
exports.default = UserModel;
