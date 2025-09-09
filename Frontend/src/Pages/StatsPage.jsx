import React, { useState } from 'react';
import { getStats } from '../utils/api';
import UrlStats from '../Components/urlStats';

const StatsPage = () => {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStats(null);

    if (!shortcode) {
      setError('Please enter a shortcode.');
      return;
    }

    try {
      const data = await getStats(shortcode);
      setStats(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching stats');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">URL Statistics</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Enter shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Get Stats
        </button>
      </form>

      <UrlStats stats={stats} />
    </div>
  );
};

export default StatsPage;
