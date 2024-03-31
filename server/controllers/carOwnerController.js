import CarOwner from '../models/CarOwnerSchema.js'


export const getSingleCarOnwer = async(req,res) => {
    const id = req.params.id;
    try {
        const caronwer = await CarOwner.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "Carowner Found",
            data: caronwer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Carowner Not Found"
        })
    }
}

export const getAllCarOnwers = async(req,res) => {
   
    try {
        const caronwers = await CarOwner.find({}).select("-password");

        res.status(200).json({
            success: true,
            message: "Carsonwers Found",
            data: caronwers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not Found"
        })
    }
}

export const updateCarOnwer = async(req,res) => {
    const id = req.params.id;
    try {
        const updateCarOnwer = await CarOwner.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateCarOnwer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed To Update"
        })
    }
}
export const deleteCarOnwer = async(req,res) => {
    const id = req.params.id;
    try {
        await CarOwner.findByIdAndDelete(id)

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


export const getCarOwnerProfile = async(req,res) => {
    const carOwnerID = req.carOwnerId;

    try {
        const carowner = await CarOwner.find(carOwnerID);

        if(!carowner){
            return res.status(404).json({
                success: false,
                message: 'Caronwer Not Found'
            })
        }
        const {password, ...rest} = carowner._doc;
        return res.status(200).json({
            success: true,
            message: 'Caronwer Profile Info',
            data:{...rest}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Oops Somthing Went Wrong'
        })
    }

}