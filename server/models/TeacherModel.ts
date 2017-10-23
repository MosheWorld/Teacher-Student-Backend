import * as mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
}, { timestamps: true });

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;