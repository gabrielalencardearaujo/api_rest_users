import express from 'express';
import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', HomeController.home);

// Routers Users:
router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findUser);

export default router;