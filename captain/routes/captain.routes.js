import express from 'express';
const router = express.Router();
import {register,login,logout,getCaptain,isAvailable} from '../controller/captain.controller.js';
import { captainAuth } from '../Middleware/authMiddleware.js';


router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);

router.get('/profile',captainAuth,getCaptain);
router.patch('/toggle-availability',captainAuth, isAvailable)


export default router;