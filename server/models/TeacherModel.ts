import * as mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    age: { type: Number, required: true, min: 0, max: 120 },
    priceTo: { type: Number, required: true, min: 0 },
    priceFrom: { type: Number, required: true, min: 0, max: 200 },
    phone: { type: String, required: true, minlength: 9 },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    personalMessage: { type: String, required: true },
    teachesAt: { type: Number, required: true, min: 0 },
    teachesInstitutions: { type: [], required: true }
}, { timestamps: true });

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;