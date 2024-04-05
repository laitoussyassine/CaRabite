import express from "express";
import {
   getSingleMechanic,
   getAllMechanics,
   updateMechanic,
   deleteMechanic,
   getMechanicProfile
} from "../controllers/mechanicController.js";
import { authenticate,restrict } from "../utils/verifyToken.js";
import ReviewRoute from './review.route.js'

const router = express.Router();

router.use("/:mechanicId/reviews", ReviewRoute);

router.get('/:id',getSingleMechanic);
router.put('/:id',authenticate,restrict(["mechanic"]),updateMechanic);
router.delete('/:id',authenticate,restrict(["mechanic"]),deleteMechanic);
router.get('/profile/me',authenticate,restrict(["mechanic"]),getMechanicProfile);

export default router;
