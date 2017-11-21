import { ObjectID } from 'mongodb';
import * as mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    teacherID: { type: String, required: true },
    image: { type: String }
}, { timestamps: true });

const ImageModel = mongoose.model("Image", ImageSchema);
export default ImageModel;