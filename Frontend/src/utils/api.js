import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // your backend URL

export const shortenUrl = async (data) => {
  const res = await axios.post(`${API_BASE}/shorturls`, data);
  return res.data;
};

export const getStats = async (shortcode) => {
  const res = await axios.get(`${API_BASE}/shorturls/${shortcode}`);
  return res.data;
};
