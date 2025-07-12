import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/User.model';

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? '3600');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({ token });
};
