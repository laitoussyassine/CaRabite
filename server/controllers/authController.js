import CarOWner from '../models/CarOwnerSchema.js'
import Mechanic from '../models/MechanicSchema.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


const generateToken = (user) => {
    return jwt.sign({id:user._id, role:user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10m"      
        }
    )
}

export const register = async(req,res) => {
    const {username, email, password, phone, role } = req.body;
    try {
        let user = null

        if(role==='carowner') {
            user = await CarOWner.findOne({email})
        }
        if(role==='mechanic') {
            user = await Mechanic.findOne({email})
        }

        // check if user already exist
        if(user) {
            return res.status(400).json({message:'user already exist'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        if(role==="carowner") {
            user = new CarOWner({
                username,
                email,
                password:hashPassword,
                phone,
                role
            })
        }
        if (role==="mechanic") {
            user = new Mechanic({
                username,
                email,
                password:hashPassword,
                phone,
                role
            })
        }
        await user.save();

        res.status(200).json({
            success: true,
            message: "user created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error, Please Try Again"
        })
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    try {
        let user = null
        const carowner = await CarOWner.findOne({email});
        const mechanic = await Mechanic.findOne({email});

        if(carowner) {
            user = carowner
        }
        if(mechanic) {
            user = mechanic
        }
        // check if user exist
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({
                success:false,
                message: "Invalid Email or Password"
            })
        }

        // get token
        const token = generateToken(user)

        const {password: _, role, ...rest} = user._doc;

        return res.status(200).json({
            success:true,
            message: "Successfully Login",
            token,
            data:{...rest},
            role
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:"Failed To Login"
        })
    }
} 