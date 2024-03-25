import express from "express";
import {
    getSingleCarOnwer,
    getAllCarOnwers,
    deleteCarOnwer,
    updateCarOnwer
} from "../controllers/carOwnerController.js";

const router = express.Router();


router.get('/:id',getSingleCarOnwer);
router.get('/',getAllCarOnwers);
router.put('/:id',updateCarOnwer);
router.delete('/:id',deleteCarOnwer);

export default router;
