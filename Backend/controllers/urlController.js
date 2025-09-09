import Url from '../models/Url.js';
import generateCode from '../utils/generateCode.js';
import validateUrl from '../utils/validateUrl.js';

export const shortenUrl = async (req, res) => {
  const { originalUrl, validity, shortcode } = req.body;

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  try {
    let shortCode = shortcode; // try custom code
    let exists = shortCode ? await Url.findOne({ shortCode }) : true;

    // Generate new code if missing or already taken
    while (!shortCode || exists) {
      shortCode = generateCode(10); // 10-character random code
      exists = await Url.findOne({ shortCode });
    }

    // Set expiry if validity provided (in days)
    const expiryDate = validity
      ? new Date(Date.now() + validity * 24 * 60 * 60 * 1000)
      : null;

    const url = new Url({
      originalUrl,
      shortCode,
      expiry: expiryDate,
    });

    await url.save();

    // Return only the short link and expiry
    res.status(201).json({
      shortLink: `${process.env.HOSTNAME || 'http://localhost:3000'}/${shortCode}`,
      expiry: expiryDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add these stubs to fix the import error
export const redirectUrl = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};

export const getStats = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};