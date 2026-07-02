import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/Explore';
import Listings from './pages/Listings';
import Flatmate from './pages/Flatmate';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Apply theme attribute to the HTML root tag
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Global Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Page Content Viewport */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/flatmate" element={<Flatmate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Support Chatbot */}
        <Chatbot />
      </div>
    </BrowserRouter>
  );
};

export default App;
