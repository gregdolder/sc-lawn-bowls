import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light flex flex-col justify-center">
      <div className="container-custom py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Oops! Looks like you've rolled your bowl a bit too far. The page you're looking for doesn't exist.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home mr-2"></i> Return to Homepage
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <i className="fas fa-envelope mr-2"></i> Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative bowling image */}
      <div className="container-custom mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-32 h-32 text-primary opacity-20">
            <path fill="currentColor" d="M448 256c0 106-86 192-192 192S64 362 64 256 150 64 256 64s192 86 192 192zm64 0c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0 64c79.5 0 144-64.5 144-144s-64.5-144-144-144-144 64.5-144 144 64.5 144 144 144zm32-144c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32z"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 