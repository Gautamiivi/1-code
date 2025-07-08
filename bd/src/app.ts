import express, { Application } from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/error.middleware'; // Optional error middleware

// Create express app
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // CORS setup
    credentials: true,
}));

import authRoutes from './routes/auth.routes'; // Example route
import userRoutes from './routes/user.routes'; // Example route


// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', environment: process.env.NODE_ENV });
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Global error handler (optional)
app.use(errorHandler); // Custom error middleware

export default app;
