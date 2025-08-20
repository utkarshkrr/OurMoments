import express from 'express';
import { signin, signup, updateWithSecret } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/forgot', updateWithSecret); // NEW

export default router;
