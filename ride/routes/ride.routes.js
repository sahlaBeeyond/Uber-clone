import express from 'express';
const router = express.Router();
import { userAuth } from '../middleware/auth.middleware.js';
import { createRide } from '../controller/ride.controller.js';



router.post('/create-ride',userAuth,createRide)


export default router;