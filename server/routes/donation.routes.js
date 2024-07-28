import express from 'express'
import { callback, sendalert } from '../controllers/donation.controller.js';


const router = express.Router();

router.get('/callback', callback);
router.post('/sendalert', sendalert);

export default router;