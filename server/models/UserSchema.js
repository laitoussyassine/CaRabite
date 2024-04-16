import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", UserSchema);
export default User