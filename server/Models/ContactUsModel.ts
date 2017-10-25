import * as mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactReason: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const ContactUsrModel = mongoose.model("ContactUs", ContactUsSchema);
export default ContactUsrModel;