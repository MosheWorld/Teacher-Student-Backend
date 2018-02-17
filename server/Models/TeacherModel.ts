import * as mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    gender: { type: Number, required: true },
    priceTo: { type: Number, required: true, min: 0 },
    teachesAt: { type: Number, required: true, min: 0 },
    rate: { type: Number, required: true, min: 0, max: 5 },
    age: { type: Number, required: true, min: 0, max: 120 },
    priceFrom: { type: Number, required: true, min: 0, max: 200 },
    image: { type: String },
    userID: { type: String, required: true },
    email: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    personalMessage: { type: String, required: true },
    phone: { type: String, required: true, minlength: 9 },
    teachesInstitutions: { type: [], required: true },
    teachesSubjects: { type: [], required: true },
    recommendations: { type: [], required: true }
}, { timestamps: true });

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;