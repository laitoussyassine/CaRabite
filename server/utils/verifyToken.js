// authMiddleware.js

import jwt from 'jsonwebtoken';
import Mechanic from '../models/MechanicSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Token is expired'
            });
        }
        console.error('Token verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};


export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;

    try {
        let user;
        const carOwner = await User.findById(userId);
        const mechanic = await Mechanic.findById(userId);

        if (carOwner) {
            user = carOwner;
        } else if (mechanic) {
            user = mechanic;
        } else {
            throw new Error('User not found');
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({
                success: false,
                message: "You're not authorized"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "User not found or invalid role"
        });
    }
};
