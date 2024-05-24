import mongoose from "mongoose";
import Workshop from "./workshopSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    workshop: {
      type: mongoose.Types.ObjectId,
      ref: "Workshop",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
    path: "user",
    select: "username"
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (workshopId) {
  // this points the current review
  const stats = await this.aggregate([
    {
    $match: { workshop: workshopId },
    },
    {
      $group: {
        _id: "$workshop",
        numOfRating: { $sum: 1 },
        avgRating: {$avg: "$rating" },
      },
    },
  ]);
  await Workshop.findByIdAndUpdate(workshopId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating
  })
  };
  reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings (this.workshop);
  });

export default mongoose.model("Review", reviewSchema);