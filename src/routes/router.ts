import express from 'express';
import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/', HomeController.home);

// Routers Users:
router.get('/user', UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', UserController.findUser);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;