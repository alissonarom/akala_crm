import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
    display_id: number;
    merchant_id?: number;
    status: string;
    order_type: string;
    order_timing?: string;
    sales_channel: string;
    customer_origin?: string;
    customer_id: mongoose.Schema.Types.ObjectId;
    total: number;
    created_at: Date;
    items: Array<{
        name: string;
        quantity: number;
        unit_price: number;
        total_price: number;
        options?: Array<{
            name: string;
            option_group_name: string;
        }>;
    }>;
    payments: Array<{
        payment_method: string;
        status: string;
    }>;
}

const OrderSchema: Schema = new Schema({
    display_id: { type: Number, required: true },
    merchant_id: { type: Number },
    status: { type: String, required: true },
    order_type: { type: String, required: true },
    order_timing: { type: String },
    sales_channel: { type: String, required: true },
    customer_origin: { type: String },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    total: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        total_price: { type: Number, required: true },
        options: [{
            name: { type: String },
            option_group_name: { type: String }
        }]
    }],
    payments: [{
        payment_method: { type: String },
        status: { type: String }
    }]
});

export default mongoose.model<IOrder>('Order', OrderSchema);
