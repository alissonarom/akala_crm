import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Hardcoded admin credentials as per requirements
    if (email === 'admin@antigravity.com' && password === 'admin123') {
        const token = jwt.sign(
            { id: 'admin', email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        res.json({
            _id: 'admin',
            name: 'Admin User',
            email: 'admin@antigravity.com',
            token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.json({ message: 'Logged out successfully' });
};

export const validate = (req: Request, res: Response) => {
    // If the middleware passed, the token is valid
    res.json({ valid: true });
};
