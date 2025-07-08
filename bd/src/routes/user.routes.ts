import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/users
router.get('/', verifyToken, getUsers);

// POST /api/users
router.post('/', createUser);

export default router;
