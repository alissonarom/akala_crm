"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Customer_1 = __importDefault(require("../src/domain/models/Customer"));
const Order_1 = __importDefault(require("../src/domain/models/Order"));
const db_1 = __importDefault(require("../src/config/db"));
dotenv_1.default.config();
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
const generateMockCustomers = (count) => {
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
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        yield Customer_1.default.deleteMany();
        yield Order_1.default.deleteMany();
        const mockCustomers = generateMockCustomers(100);
        yield Customer_1.default.insertMany(mockCustomers);
        console.log('Data Imported!');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
});
importData();
