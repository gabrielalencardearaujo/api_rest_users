import express from 'express';
import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', HomeController.home)

// Routers Users:
router.post('/user', UserController.create)

export default router;