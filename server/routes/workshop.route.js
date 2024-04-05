// routes.js

import express from 'express';
import {
  createWorkshop,
  getWorkshopsByOwner,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
} from '../controllers/workshopController.js';
import { authenticate, restrict } from '../utils/verifyToken.js';
import upload from '../middlwares/multer.js';

const router = express.Router();

// Workshop routes
router.post('/', authenticate, restrict(["mechanic"]), upload.single('image'), createWorkshop);
router.get('/', authenticate, restrict(["mechanic"]),getWorkshopsByOwner);
router.get('/:id', authenticate, getWorkshopById);
router.put('/:id', authenticate, restrict(["mechanic"]),upload.single('image'), updateWorkshop);
router.delete('/:id', authenticate, restrict(["mechanic"]), deleteWorkshop);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

export default router;
