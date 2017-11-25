import * as mongoose from "mongoose";

const IPSchema = new mongoose.Schema({
    ip: { type: String },
    path: { type: String },
    date: { type: String },
    subdomains:{ type: [] }
}, { timestamps: true });

const IPModel = mongoose.model("IP", IPSchema);
export default IPModel;