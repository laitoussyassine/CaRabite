import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const CarOwnerSchema = new mongoose.Schema(
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
            enum: ['carowner', "admin"],
            default: "carowner",
        }

    },
    { timestamps: true }
)

const CarOwner = mongoose.model("CarOwner", CarOwnerSchema);
export default CarOwner