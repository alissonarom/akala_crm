import mongoose, { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
    user_id: mongoose.Schema.Types.ObjectId; // Could be admin ID or customer ID if we expand
    messages: Array<{
        role: string;
        content: string;
        timestamp: Date;
    }>;
    created_at: Date;
}

const ConversationSchema: Schema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Optional for now as it's a single admin
    messages: [{
        role: { type: String, required: true, enum: ['user', 'model'] },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
