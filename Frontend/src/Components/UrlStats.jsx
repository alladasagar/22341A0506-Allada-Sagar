import React from 'react';

const UrlStats = ({ stats }) => {
  if (!stats) return null;

  const { originalUrl, shortLink, createdAt, expiry, totalClicks, clicks } = stats;

  return (
    <div className="mt-6 max-w-3xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">URL Stats</h2>

      <p>
        <span className="font-semibold">Original URL:</span>{' '}
        <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
          {originalUrl}
        </a>
      </p>

      <p>
        <span className="font-semibold">Short Link:</span>{' '}
        <a href={shortLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {shortLink}
        </a>
      </p>

      <p><span className="font-semibold">Created At:</span> {new Date(createdAt).toLocaleString()}</p>
      <p><span className="font-semibold">Expiry:</span> {expiry ? new Date(expiry).toLocaleString() : 'No expiry'}</p>
      <p><span className="font-semibold">Total Clicks:</span> {totalClicks}</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Click Details:</h3>
      {clicks.length === 0 ? (
        <p>No clicks yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Timestamp</th>
                <th className="px-3 py-2 border">IP</th>
                <th className="px-3 py-2 border">User Agent</th>
                <th className="px-3 py-2 border">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {clicks.map((click, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="px-3 py-2 border">{new Date(click.timestamp).toLocaleString()}</td>
                  <td className="px-3 py-2 border">{click.ip}</td>
                  <td className="px-3 py-2 border break-all">{click.userAgent}</td>
                  <td className="px-3 py-2 border break-all">{click.referrer || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UrlStats;
