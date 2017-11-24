import * as mongoose from "mongoose";

const IPSchema = new mongoose.Schema({
    ip: { type: String },
    ips: { type: [] },
    date: { type: String }
}, { timestamps: true });

const IPModel = mongoose.model("IP", IPSchema);
export default IPModel;