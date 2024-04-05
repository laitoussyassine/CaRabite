import express from 'express';
import { createCity,createProvinces } from '../controllers/dataController.js';

const router = express.Router();

// Route to create a city
router.post('/cities', createCity);

// Route to create a province
router.post('/provinces', createProvinces);

export default router;
