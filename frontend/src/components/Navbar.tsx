import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Simple auth check
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    closeMenu();
    navigate('/login');
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo-container" onClick={handleLogoClick}>
          <img src="/images/logo.png" alt="ResPlek Logo" className="logo-img" />
          <span className="logo-text">ResPlek</span>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/listings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/flatmate" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Flatmate
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <div className="nav-auth-desktop">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <NavLink to="/dashboard" className="nav-link" style={{ fontWeight: 600 }}>
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.9rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="nav-btn">
                Login
              </NavLink>
            )}
          </div>

          <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <ul className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" onClick={closeMenu} className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={closeMenu} className="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" onClick={closeMenu} className="nav-link">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/listings" onClick={closeMenu} className="nav-link">
            Listings
          </NavLink>
        </li>
        <li>
          <NavLink to="/flatmate" onClick={closeMenu} className="nav-link">
            Flatmate
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={closeMenu} className="nav-link">
            Contact
          </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/dashboard" onClick={closeMenu} className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={closeMenu} className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
};
export default Navbar;
