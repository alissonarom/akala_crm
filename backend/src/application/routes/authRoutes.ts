import express from 'express';
import { login, logout, validate } from '../controllers/AuthController';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/validate', validate);

export default router;
