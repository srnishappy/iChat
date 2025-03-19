import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import {
  getUserSidebar,
  getMessage,
  sendMessage,
} from '../controller/message.js';

const router = express.Router();

router.get('/user', protectRoute, getUserSidebar);
router.get('/:id', protectRoute, getMessage);
router.post('/send/:id', protectRoute, sendMessage);
export default router;
