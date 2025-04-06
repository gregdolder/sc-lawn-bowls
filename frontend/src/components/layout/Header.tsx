import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'The Game', path: '/the-game' },
    { name: 'Events', path: '/events' },
    { name: 'The Club', path: '/the-club' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md pt-0 pb-2' : 'bg-transparent pt-0 pb-4'
      }`}
    >
      <div className="w-full flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img 
              src="/src/assets/logos/logo-centered.png" 
              alt="Santa Cruz Lawn Bowls Club Logo" 
              className="h-12 md:h-14 mr-3"
            />
            <div className="hidden sm:block">
              <div className="text-xl md:text-2xl font-bold m-0 leading-none text-secondary font-sans tracking-tight">
                Santa Cruz <span className="text-primary">Lawn Bowls</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center"
            >
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-white bg-primary hover:bg-primary-dark hover:text-white'
                    : isScrolled
                    ? 'text-gray-800 hover:bg-gray-100'
                    : 'text-gray-800 hover:bg-white/30'
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
            className="flex items-center"
          >
            <Link
              to="/join"
              className="ml-2 btn btn-accent inline-flex items-center justify-center"
            >
              Join Us
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="w-full px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/join" className="btn btn-accent w-full text-center">
                Join Us
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 