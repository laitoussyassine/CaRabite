import mongoose from "mongoose";

const MecanicShema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role: {
            type: String,
        },

        // Fields for mechanic only
        photo: { type: String },
        workshopBranches: [
            {
                city: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "City",
                },
                address: String,
                mobile: String,
            },
        ],
        workshopDescription: {
            type: String,
        },
        workshopServices: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            },
        ],
        timeSlots: { type: Array },
        reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
        averageRating: {
            type: Number,
            default: 0,
        },
        totalRating: {
            type: Number,
            default: 0,
        },

    }
)
const Mechanic = mongoose.model("Mechanic", MecanicShema);
export default Mechanic