import express from 'express';
import {
  createWorkshop,
  getWorkshopsByOwner,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshopById,
} from '../controllers/workshopController.js';
import { authenticate, restrict } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', authenticate, restrict(["mechanic"]), createWorkshop);
router.get('/', authenticate, restrict(["mechanic"]),getWorkshopsByOwner);
router.get('/:id', authenticate, getWorkshopById);
router.put('/:id', authenticate, restrict(["mechanic"]),updateWorkshop);
router.delete('/:id',  deleteWorkshopById);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

export default router;
