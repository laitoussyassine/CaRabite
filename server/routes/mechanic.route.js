import express from "express";
import {
   getSingleMechanic,
   getAllMechanics,
   updateMechanic,
   deleteMechanic
} from "../controllers/mechanicController.js";
import { restrict } from "../util/verifyToken.js";
import ReviewRoute from './review.route.js'

const router = express.Router();

router.use("/:mechanicId/reviews", ReviewRoute);
router.get('/:id',getSingleMechanic);
router.get('/',getAllMechanics);
router.put('/:id',restrict(["mechanic"]),updateMechanic);
router.delete('/:id',restrict(["mechanic"]),deleteMechanic);

export default router;
