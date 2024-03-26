import CarOWner from '../models/CarOwnerSchema.js'
import Mechanic from '../models/MechanicSchema.js'
import Review from '../models/ReviewSchema.js'


export const getAllReviews = (req,res) => {
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
    if(!req.body.mechanic) req.body.mechanic = req.params.mechanicId
    if(!req.body.caronwer) req.body.caronwer = req.caronwerId

    const newReview = new Review(req.body);

    try {
        const saveReview = await newReview.save();
        await Mechanic.findByIdAndUpdate(req.body.mechanic, {
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