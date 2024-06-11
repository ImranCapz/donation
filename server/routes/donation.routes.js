import express from 'express'
import { getauth, callback, sendalert } from '../controllers/donation.controller.js';


const router = express.Router();

router.get('/auth', getauth);
router.get('/callback', callback);
router.post('/sendalert', sendalert);

export default router;