import React, { useState } from 'react';
import { shortenUrl } from '../utils/api';

const UrlForm = ({ onSuccess }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        originalUrl,
        validity: validity ? Number(validity) : undefined,
        shortcode: shortcode || undefined,
      };
      const result = await shortenUrl(data);
      onSuccess(result);
      setOriginalUrl('');
      setValidity('');
      setShortcode('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error shortening URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Original URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Validity (days)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Custom Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Shorten URL
      </button>
    </form>
  );
};

export default UrlForm;
