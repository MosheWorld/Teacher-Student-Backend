import * as mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    fullName: { type: String, required: true },
    teacherID: { type: String, required: true }
}, { timestamps: true });

const RecommendationModel = mongoose.model("Recommendation", RecommendationSchema);
export default RecommendationModel;