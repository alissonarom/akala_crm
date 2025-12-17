import { Request, Response } from 'express';
import Order from '../../domain/models/Order';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({ created_at: -1 }).limit(100);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getOrderMetrics = async (req: Request, res: Response) => {
    try {
        // Calculate total revenue
        const revenueResult = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        res.json({
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
