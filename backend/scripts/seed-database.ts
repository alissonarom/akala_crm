import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from '../src/domain/models/Customer';
import Order from '../src/domain/models/Order';
import connectDB from '../src/config/db';

dotenv.config();

const customers = [
    {
        name: "Alice Johnson",
        email: "alice@example.com",
        whatsapp: "5511999999999",
        status: true,
        tags: ["top10", "lucrativo"],
        total_orders: 15,
        average_ticket: 85.50,
        last_order_date: new Date(),
        evaluation: { score: 5, comment: "Amazing food!" },
        origin: "Instagram",
        lead_score: 95,
        customer_since: new Date("2024-01-15"),
        insight: JSON.stringify({ behavior_summary: "Frequent buyer", strategic_opportunities: ["VIP Dinner"], next_best_action: "Send thank you note" })
    },
    {
        name: "Bob Smith",
        email: "bob@example.com",
        whatsapp: "5511888888888",
        status: true,
        tags: ["tímido"],
        total_orders: 3,
        average_ticket: 45.00,
        last_order_date: new Date("2024-11-20"),
        evaluation: { score: 4, comment: "Good, but delivery was slow." },
        origin: "iFood",
        lead_score: 40,
        customer_since: new Date("2024-06-10")
    },
    // Add more mock data as needed... 
    // I will generate more programmatically to reach ~100
];

const generateMockCustomers = (count: number) => {
    const generated = [];
    const origins = ["Instagram", "iFood", "WhatsApp", "Site", "Delivery", "Presencial"];
    const tagsList = ["top10", "superfã", "sumido", "não avaliou", "tímido", "lucrativo", "magrinho"];

    for (let i = 0; i < count; i++) {
        const isMale = Math.random() > 0.5;
        const name = `Customer ${i + 1}`;
        const totalOrders = Math.floor(Math.random() * 50);
        const avgTicket = Math.floor(Math.random() * 100) + 20;
        const leadScore = Math.floor((totalOrders * avgTicket) / 10); // Simple logic

        generated.push({
            name: name,
            email: `customer${i}@example.com`,
            whatsapp: `55119${Math.floor(Math.random() * 100000000)}`,
            status: true,
            tags: [tagsList[Math.floor(Math.random() * tagsList.length)]],
            total_orders: totalOrders,
            average_ticket: avgTicket,
            last_order_date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            evaluation: { score: Math.floor(Math.random() * 5) + 1, comment: "Auto generated comment" },
            origin: origins[Math.floor(Math.random() * origins.length)],
            lead_score: leadScore,
            customer_since: new Date(Date.now() - Math.floor(Math.random() * 30000000000)),
            male: isMale
        });
    }
    return generated;
};

const importData = async () => {
    try {
        await connectDB();

        await Customer.deleteMany();
        await Order.deleteMany();

        const mockCustomers = generateMockCustomers(100);
        await Customer.insertMany(mockCustomers);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
