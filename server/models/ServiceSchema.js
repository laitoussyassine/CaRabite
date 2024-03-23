import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema(
    {
        servicename: {
            type: String,
            required: rtue,
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
)
const Service = mongoose.model("Service", ServiceSchema);
module.exports = {
    Service
};