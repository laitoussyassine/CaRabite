import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema(
    {
        servicename: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
)
const Service = mongoose.model("Service", ServiceSchema);
export default Service;