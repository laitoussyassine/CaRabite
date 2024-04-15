import User from '../models/UserSchema.js';
import Mechanic from '../models/MechanicSchema.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import validateUserCreation from '../middlwares/validateUsers.js';


const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10h"
        }
    )
}

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        let user;

        const validationUser = validateUserCreation(req.body);
        if (validationUser.error) {
            return res.status(400).send({
                message: validationUser.error.message
            });
        }

        const UserEmailExist = await User.findOne({ email });
        const MechanicEmailExist = await Mechanic.findOne({ email });

        if (UserEmailExist || MechanicEmailExist) {
            return res.status(400).json({ message: 'email already exist' })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        if (role === "user") {
            user = new User({
                username,
                email,
                password: hashPassword,
                role
            })
        }
        if (role === "mechanic") {
            user = new Mechanic({
                username,
                email,
                password: hashPassword,
                role
            })
        }
        await user.save();

        res.status(200).json({
            success: true,
            message: "user created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error, Please Try Again"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validationUser = validateUserCreation(req.body);
        if (validationUser.error) {
            return res.status(400).send({
                message: validationUser.error.message
            });
        }
        let user = null
        const carowner = await User.findOne({ email });
        const mechanic = await Mechanic.findOne({ email });

        if (carowner) {
            user = carowner
        }
        if (mechanic) {
            user = mechanic
        }
        // check if user exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        // get token
        const token = generateToken(user)

        const { password: _, role, ...rest } = user._doc;

        return res.status(200).json({
            success: true,
            message: "Successfully Login",
            token,
            data: { ...rest },
            role
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed To Login"
        })
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("clearjwt", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.status(200).json({
            success: true,
            message: "Logout success"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || "Oops something went wrong"
        });
    }
}