import React, { useState } from 'react';
import UrlForm from '../Components/urlForm';
import UrlResult from '../Components/urlResult';

const ShortenerPage = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">URL Shortener</h1>
      <UrlForm onSuccess={setResult} />
      <UrlResult result={result} />
    </div>
  );
};

export default ShortenerPage;