import { Request, Response } from 'express';
import Conversation from '../../domain/models/Conversation';
import { chatWithNova } from '../../infrastructure/gemini';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message, history } = req.body;

        // Call Gemini (Nova)
        const response = await chatWithNova(message, history);

        // Save conversation (optional, or just return response)
        // For this MVP, we might just return the response and let frontend manage history state,
        // or save it to a single conversation document for the user.

        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing message' });
    }
};
