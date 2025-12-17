import express from 'express';
import { sendMessage } from '../controllers/ChatController';

const router = express.Router();

router.post('/message', sendMessage);

export default router;
