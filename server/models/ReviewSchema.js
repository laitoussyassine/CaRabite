import mongoose from "mongoose";
import Mechanic from "./MechanicSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    mechanic: {
      type: mongoose.Types.ObjectId,
      ref: "Mechanic",
    },
    carowner: {
      type: mongoose.Types.ObjectId,
      ref: "CarOwner",
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

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: "carowner",
    select: "username"
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (mechanicId) {
  // this points the current review
  const stats = await this.aggregate([
    {
    $match: { mechanic: mechanicId },
    },
    {
      $group: {
        _id: "$mechanic",
        numOfRating: { $sum: 1 },
        avgRating: {$avg: "$rating" },
      },
    },
  ]);
  await Mechanic.findByIdAndUpdate(mechanicId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating
  })
  };
  reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings (this.mechanic);
  });

export default mongoose.model("Review", reviewSchema);