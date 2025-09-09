import Url from '../models/Url.js';
import Click from '../models/Click.js';

export const redirectUrl = async (req, res) => {
  const { shortcode } = req.params;

  try {
    const url = await Url.findOne({ shortCode: shortcode });
    if (!url) return res.status(404).json({ message: 'Short URL not found' });

    // Check expiry
    if (url.expiry && new Date() > url.expiry) {
      return res.status(410).json({ message: 'Short URL has expired' });
    }

    // Track click
    await Click.create({
      shortCode: shortcode,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer') || '',
      timestamp: new Date(),
    });

    // Redirect to the original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
