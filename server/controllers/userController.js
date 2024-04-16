import User from '../models/UserSchema.js'


export const getSingleUser = async(req,res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "user Found",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user Not Found"
        })
    }
}

export const getAllUsers = async(req,res) => {
   
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json({
            success: true,
            message: "users Found",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not Found"
        })
    }
}

export const updateUser = async(req,res) => {
    const id = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed To Update"
        })
    }
}
export const deleteUser = async(req,res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)

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


export const getUserProfile = async(req,res) => {
    const userID = req.userId;

    try {
        const user = await User.findById(userID);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'user Not Found'
            })
        }
        const {password, ...rest} = user._doc;
        return res.status(200).json({
            success: true,
            message: 'user Profile Info',
            data:{...rest}
        })
    } catch (error) {
        console.error('Error fetching user profile:', error);
    return res.status(500).json({
        success: false,
        message: 'Oops Something Went Wrong'
    });
    }

}