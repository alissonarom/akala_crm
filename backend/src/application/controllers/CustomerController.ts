import { Request, Response } from 'express';
import Customer, { ICustomer } from '../../domain/models/Customer';
import { generateGeminiInsight } from '../../infrastructure/gemini'; // We will create this later

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Tipagem usando apenas o cast simples
        const customers = await Customer
            .find({})
            .select('-__v')
            .lean() as ICustomer[]; // Note que removemos o 'unknown as'
            
        res.status(200).json(customers);

    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ 
            message: 'Erro interno do servidor ao buscar a lista de clientes.',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getCustomerMetrics = async (req: Request, res: Response) => {
    try {
        const totalCustomers = await Customer.countDocuments();

        // Example aggregation for origin distribution
        const originDistribution = await Customer.aggregate([
            { $group: { _id: "$origin", count: { $sum: 1 } } }
        ]);

        // New customers (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newCustomers = await Customer.countDocuments({ customer_since: { $gte: thirtyDaysAgo } });

        // Average time between orders (mock calculation or complex aggregation needed)
        // For MVP, we might calculate this from a sample or pre-calculated field
        const avgTimeBetweenOrders = 12.5; // Placeholder

        res.json({
            totalCustomers,
            originDistribution,
            newCustomers,
            avgTimeBetweenOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const generateInsight = async (req: Request, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Call Gemini Service
        const insightData = await generateGeminiInsight(customer);

        // Update customer with new insight
        customer.insight = JSON.stringify(insightData);
        customer.last_insight_date = new Date();
        await customer.save();

        res.json(insightData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating insight' });
    }
};
