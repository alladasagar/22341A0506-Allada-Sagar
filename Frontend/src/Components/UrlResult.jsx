import React from 'react';

const UrlResult = ({ result }) => {
  if (!result) return null;

  const { shortLink, expiry } = result;
  return (
    <div className="mt-6 text-center">
      <p className="text-lg font-semibold">Shortened URL:</p>
      <a
        href={shortLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-all"
      >
        {shortLink}
      </a>
      <p className="mt-2 text-gray-600">
        Expiry: {expiry ? new Date(expiry).toLocaleString() : 'No expiry'}
      </p>
    </div>
  );
};

export default UrlResult;
