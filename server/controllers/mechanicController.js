import Mechanic from '../models/MechanicSchema.js'


export const getSingleMechanic = async(req,res) => {
    const id = req.params.id;
    try {
        const mechanic = await Mechanic.findById(id)
        .populate("reviews")
        .select("-password");

        res.status(200).json({
            success: true,
            message: "Mechanic Found",
            data: mechanic
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Mechanic Not Found"
        })
    }
}

export const getAllMechanics = async(req,res) => {
   
    try {
        // Extract search parameters from request body or query string
        const { city, address, service } = req.body; // Assuming these parameters are sent via request body

        // Construct a base query
        let query = {};

        // Add conditions based on search parameters
        if (city) {
            query['workshopBranches.city'] = city; // Assuming city is the ObjectId of the city
        }
        if (address) {
            query['workshopBranches.address'] = address;
        }
        if (service) {
            query['workshopServices'] = service; // Assuming service is the ObjectId of the service
        }

        // Execute the search query
        const mechanics = await Mechanic.find(query).select("-password");

        res.status(200).json({
            success: true,
            message: "Mechanics Found",
            data: mechanics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateMechanic = async(req,res) => {
    const id = req.params.id;
    try {
        const updateMechanic = await Mechanic.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateMechanic
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed To Update"
        })
    }
}
export const deleteMechanic = async(req,res) => {
    const id = req.params.id;
    try {
        await Mechanic.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed To Delete"
        })
    }
}
