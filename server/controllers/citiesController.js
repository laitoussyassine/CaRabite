import City from '../models/CitySchema.js';


export const getCities = async (req,res) => {
    try {
        const cities = await City.find({});
        res.status(200).json({
            success: true,
            message: "cities geting successfully",
            data: cities
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "cities not found",
        })
    }
}