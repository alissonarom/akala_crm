// src/domain/models/Customer.ts
import mongoose, { Document, Schema } from 'mongoose';

// --- 1. Interface de Dados Pura (POJO - O que o .lean() retorna) ---
// Esta interface representa apenas a estrutura dos dados que você espera no frontend/controller.
export interface ICustomer {
    // Note que não estende Document aqui.
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    whatsapp: string;
    status: boolean;
    tags: string[];
    total_orders: number;
    average_ticket: number;
    last_order_date?: Date; // Use '?' se puder ser opcional ou null
    evaluation: { score: number; comment: string; };
    male: boolean;
    origin: string;
    insight?: string; 
    lead_score: number;
    customer_since?: Date;
    created_at?: Date;
    last_insight_date?: Date;
    // Não inclua o '__v' aqui, pois ele é removido no .select('-__v')
}

// --- 2. Interface do Documento Mongoose (O que o Mongoose manipula) ---
// Esta interface estende o Document e será usada no modelo.
export interface ICustomerDocument extends ICustomer, Document {} 
// Agora, ICustomerDocument tem todos os campos de ICustomer E os métodos/props do Mongoose.

const CustomerSchema: Schema = new Schema({
    // Remova o _id daqui. O Mongoose o gerencia automaticamente,
    // a menos que você queira atribuí-lo manualmente em um cenário específico.
    // O Mongoose adiciona o _id por padrão (do tipo ObjectId).
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // ... (restante do Schema) ...
    whatsapp: { type: String, required: true },
    status: { type: Boolean, default: true },
    tags: [{ type: String }],
    total_orders: { type: Number, default: 0 },
    average_ticket: { type: Number, default: 0 },
    last_order_date: { type: Date },
    evaluation: {
        score: { type: Number, min: 1, max: 5 },
        comment: { type: String }
    },
    male: { type: Boolean, default: false },
    origin: { type: String },
    lead_score: { type: Number, default: 0 },
    customer_since: { type: Date },
    insight: { type: String },
    last_insight_date: { type: Date },
}, { 
    timestamps: { createdAt: 'created_at' }
});

// Usamos ICustomerDocument no modelo
const Customer = mongoose.model<ICustomerDocument>('Customer', CustomerSchema);

export default Customer;