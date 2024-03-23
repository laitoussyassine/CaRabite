import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    mechanic: {
      type: mongoose.Types.ObjectId,
      ref: "Mechanic",
    },
    carOnwer: {
      type: mongoose.Types.ObjectId,
      ref: "CarOnwer",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);