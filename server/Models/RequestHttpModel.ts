import * as mongoose from "mongoose";

const RequestHttpSchema = new mongoose.Schema({
    ip: { type: String },
    path: { type: String },
    date: { type: String },
    method: { type: String },
    body: { type: String }
}, { timestamps: true });

const RequestHttpModel = mongoose.model("RequestHttp", RequestHttpSchema);
export default RequestHttpModel;