import { ObjectID } from 'mongodb';
import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String },
    email: { type: String },
    id: { type: String },
    token: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;