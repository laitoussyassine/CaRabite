import express from "express";
import {
    getSingleCarOnwer,
    getAllCarOnwers,
    deleteCarOnwer,
    updateCarOnwer
} from "../controllers/carOwnerController.js";
import { authenticate, restrict } from "../util/verifyToken.js";

const router = express.Router();


router.get('/:id',authenticate, restrict(["carowner"]),getSingleCarOnwer);
router.get('/', restrict(["admin"]),getAllCarOnwers);
router.put('/:id', restrict(["carowner"]) ,updateCarOnwer);
router.delete('/:id', restrict(["carowner"]),deleteCarOnwer);

export default router;
