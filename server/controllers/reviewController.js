import Workshop from '../models/workshopSchema.js'
import Review from '../models/ReviewSchema.js'


export const getAllReviews = async (req,res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json({
            succes: true,
            message: "success",
            data: reviews
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message:"not found"
        })
    }
}

export const createReview = async(req,res) => {
    if(!req.body.workshop) req.body.workshop = req.params.workshopId;
    if(!req.body.user) req.body.user = req.userId;
    console.log(req.body.workshop);

    const newReview = new Review(req.body);

    try {
        const saveReview = await newReview.save();
        await Workshop.findByIdAndUpdate(req.body.workshop, {
            $push:{reviews: saveReview._id}
        })
        
        res.status(200).json({
            success: true,
            message:"Review Successfully Submited",
            data: saveReview
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}