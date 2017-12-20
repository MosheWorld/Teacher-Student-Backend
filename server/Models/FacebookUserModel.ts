import { ObjectID } from 'mongodb';
import * as mongoose from "mongoose";

const FacebookUserSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    lastName: { type: String },
    provider: { type: String },
    photoUrl: { type: String },
    firstName: { type: String },
    authToken: { type: String }
}, { timestamps: true });

const FacebookUserModel = mongoose.model("FacebookUser", FacebookUserSchema);
export default FacebookUserModel;