import jwt from 'jsonwebtoken';
import Mechanic from '../models/MechanicSchema.js';
import CarOwner from '../models/CarOwnerSchema.js';

export const authenticate = async(req,res,next)=>{
    const gettoken = req.headers.authorization;

    if(!gettoken || !gettoken.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: 'No token unauthorized'
        })
    }
    try {

        const token = gettoken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.id;
        req.role = decoded.role

        next();
    } catch (error) {
        console.log(error);
        if(error.name === "TokenExpirederror") {
            return res.status(401).json({
                message:'Token Is Expired'
            })
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }

}

export const restrict = roles => async(req,res,next) => {
    const userId = req.userId;

    let user;
    const carowner = await CarOwner.findById(userId);
    const mechanic = await Mechanic.findById(userId);

    if(carowner) {
        user=carowner
    }
    if(mechanic) {
        user=mechanic
    }

    if(!roles.includes(user.role)) {
        return res.status(401).json({
            success: false,
            message: "You're Not Authorized"
        })
    }
    next();
} 