import express from 'express';
import { shortenUrl, redirectUrl, getStats } from '../controllers/shortenUrl.js';

const router = express.Router();

// Shorten URL
router.post('/shorturls', shortenUrl);

// Get URL stats
router.get('/shorturls/:shortcode', getStats);

// Redirect to original URL
router.get('/:shortcode', redirectUrl);

export default router;
