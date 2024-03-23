import mongoose from "mongoose"
import joi from "joi"

const CitySchema = new mongoose.Schema(
  {
    cityname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("City", CitySchema);
module.exports = {
    City
};