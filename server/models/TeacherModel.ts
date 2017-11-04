import * as mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    priceTo: { type: Number, required: true, min: 0 },
    rate:{ type: Number, required: true, min: 0, max: 5 },
    age: { type: Number, required: true, min: 0, max: 120 },
    priceFrom: { type: Number, required: true, min: 0, max: 200 },
    phone: { type: String, required: true, minlength: 9 },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    personalMessage: { type: String, required: true },
    teachesAt: { type: Number, required: true, min: 0 },
    teachesInstitutions: { type: [], required: true },
    recommendations: { type: [], required: true }
}, { timestamps: true });

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;