import express from "express";
import {
   getSingleMechanic,
   getAllMechanics,
   updateMechanic,
   deleteMechanic
} from "../controllers/mechanicController.js";

const router = express.Router();


router.get('/:id',getSingleMechanic);
router.get('/',getAllMechanics);
router.put('/:id',updateMechanic);
router.delete('/:id',deleteMechanic);

export default router;
