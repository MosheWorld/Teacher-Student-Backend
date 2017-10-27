import * as mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true }
}, { timestamps: true });

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;