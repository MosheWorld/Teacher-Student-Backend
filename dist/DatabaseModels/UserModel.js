"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    lastName: { type: String },
    provider: { type: String },
    photoUrl: { type: String },
    firstName: { type: String },
    authToken: { type: String },
    role: { type: Number }
}, { timestamps: true });
var UserModel = mongoose.model("User", UserSchema);
exports.default = UserModel;
