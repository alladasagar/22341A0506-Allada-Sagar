import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './Pages/ShortenerPage';
import StatsPage from './Pages/StatsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />

      </Routes>
    </Router>
  );
};

export default App;
