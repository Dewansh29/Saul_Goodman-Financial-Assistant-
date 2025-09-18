import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import App from './App';
import About from './components/About/About';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
