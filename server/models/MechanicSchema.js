import mongoose from "mongoose";

const MecanicSchema = new mongoose.Schema(
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
        role: {
            type: String,
        }
    }
)
const Mechanic = mongoose.model("Mechanic", MecanicSchema);
export default Mechanic