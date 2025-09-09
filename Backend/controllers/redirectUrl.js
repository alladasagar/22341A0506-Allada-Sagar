import Url from '../models/Url.js';
import generateCode from '../utils/generateCode.js';
import validateUrl from '../utils/validateUrl.js';
import Click from '../models/Click.js'; 

export const shortenUrl = async (req, res) => {
  const { originalUrl, validity, shortcode } = req.body;

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
    let shortCode = shortcode; 
    let exists = shortCode ? await Url.findOne({ shortCode }) : true;

 
    while (!shortCode || exists) {
      shortCode = generateCode(10); 
      exists = await Url.findOne({ shortCode });
    }

    const expiryDate = validity
      ? new Date(Date.now() + validity * 24 * 60 * 60 * 1000)
      : null;

    const url = new Url({
      originalUrl,
      shortCode,
      expiry: expiryDate,
    });

    await url.save();


    res.status(201).json({
      shortLink: `${process.env.HOSTNAME || 'http://localhost:3000'}/${shortCode}`,
      expiry: expiryDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortcode } = req.params;

  try {
    const url = await Url.findOne({ shortCode: shortcode });
    if (!url) return res.status(404).json({ message: 'Short URL not found' });

    if (url.expiry && new Date() > url.expiry) {
      return res.status(410).json({ message: 'Short URL has expired' });
    }

    await Click.create({
      shortCode: shortcode,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referrer') || '',
      timestamp: new Date(),
    });

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};