import express from 'express';
import { shortenUrl, redirectUrl, getStats } from '../controllers/urlController.js';

const router = express.Router();

// Create a short URL
router.post('/shorturls', shortenUrl);

// Redirect to original URL
router.get('/:shortcode', redirectUrl);

// Get statistics
router.get('/shorturls/:shortcode', getStats);

export default router;
