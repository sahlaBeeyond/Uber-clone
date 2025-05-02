import express from 'express';
const router = express.Router();
import { userAuth } from '../middleware/auth.middleware';
import { createRide } from '../controller/ride.controller';



router.post('/create-ride',userAuth,createRide)


export default router;