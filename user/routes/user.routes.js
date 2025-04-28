import express from 'express';
const router = express.Router();
import {register,login,logout, getUser} from '../controller/user.controller.js';
import { userAuth } from '../Middleware/authMiddleware.js';


router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/profile',userAuth,getUser);


export default router;