import express from "express";
import {
    getAllCarOnwers,
    createReview
} from '../controllers/reviewController.js'
import { authenticate, restrict } from "../util/verifyToken.js";

const router = express.Router();

router.route('/')
    .get(getAllCarOnwers)
    .post(authenticate,restrict(['caronwer']),createReview)

export default router;
