import * as mongoose from "mongoose";

const LoggerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: String },
    time: { type: Date, required: true }
}, { timestamps: true });

const LoggerModel = mongoose.model("Logger", LoggerSchema);
export default LoggerModel;