import express from 'express';
import { getOrders, getOrderMetrics } from '../controllers/OrderController';

const router = express.Router();

router.get('/', getOrders);
router.get('/metrics', getOrderMetrics);

export default router;
