import express from "express";
import {
    getSingleUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserProfile
} from "../controllers/userController.js";
import { authenticate, restrict } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/:id',authenticate, restrict(["user"]),getSingleUser);
router.get('/', restrict(["admin"]),getAllUsers);
router.put('/:id', restrict(["user"]),updateUser);
router.delete('/:id', restrict(["user"]),deleteUser);
router.get('/profile/me', authenticate,getUserProfile);

export default router;
