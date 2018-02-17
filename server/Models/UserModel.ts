import { ObjectID } from 'mongodb';
import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;