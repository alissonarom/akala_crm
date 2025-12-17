import express from 'express';
import authRoutes from './authRoutes';
import customerRoutes from './customerRoutes';
import orderRoutes from './orderRoutes';
import chatRoutes from './chatRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);
router.use('/chat', chatRoutes);

export default router;
