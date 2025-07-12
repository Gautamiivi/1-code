import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: 'All fields are required' });
        }

        const newUser = await userService.createUser({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};
