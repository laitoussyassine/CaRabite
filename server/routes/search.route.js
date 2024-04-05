// routes.js

import express from 'express';
import {
  searchWorkshops,
  getAllWorkshops,
  getWorkshopById,
} from '../controllers/searchController.js';

const router = express.Router();

// Workshop search route
router.get('/workshops/search', searchWorkshops);

// Workshop routes for normal users
router.get('/workshops', getAllWorkshops);
router.get('/workshops/:id', getWorkshopById);

export default router;
