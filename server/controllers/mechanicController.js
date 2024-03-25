import Mechanic from '../models/MechanicSchema.js'


export const getSingleMechanic = async(req,res) => {
    const id = req.params.id;
    try {
        const mechanic = await Mechanic.findById(id).select("-password");

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
        const mechanics = await Mechanic.find({}).select("-password");

        res.status(200).json({
            success: true,
            message: "Mechanics Found",
            data: mechanics
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not Found"
        })
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
