// workshopsRoutes.js

import express from 'express';
import { getAllWorkshops } from '../controllers/searchController.js';

const router = express.Router();

// Public route for searching workshops by city (no authentication required)
router.get('/', getAllWorkshops);

export default router;
