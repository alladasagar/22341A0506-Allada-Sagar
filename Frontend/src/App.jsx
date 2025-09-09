import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './Pages/ShortenerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
