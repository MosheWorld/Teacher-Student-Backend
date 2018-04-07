import * as mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    fullName: { type: String, required: true },
    contactReason: { type: String, required: true }
}, { timestamps: true });

const ContactUsrModel = mongoose.model("ContactUs", ContactUsSchema);
export default ContactUsrModel;