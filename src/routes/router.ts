import express from 'express';
import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';
import MiddlewareLogin from '../Middlewares/AdminAuth';

const router = express.Router();

router.get('/', HomeController.home);

// Routers Users:
router.get('/user', MiddlewareLogin.AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', UserController.findUser);
router.put('/user/:id', MiddlewareLogin.AdminAuth, UserController.update);
router.delete('/user/:id', MiddlewareLogin.AdminAuth, UserController.delete);

// Router Login
router.post('/login', UserController.login);


export default router;