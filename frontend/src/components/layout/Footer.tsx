import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and short description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <div className="text-white mr-2 group-hover:text-accent transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-8 h-8"
                >
                  <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold m-0 leading-none">
                  <span className="text-white group-hover:text-green-300 transition-colors">Santa Cruz</span>{" "}
                  <span className="text-accent">Lawn Bowls</span>
                </h2>
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              Join us for friendly competition and camaraderie on the green in beautiful Santa Cruz, California.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/the-game" className="text-gray-300 hover:text-white transition-colors">The Game</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/the-club" className="text-gray-300 hover:text-white transition-colors">The Club</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/join" className="text-gray-300 hover:text-white transition-colors">Join Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-accent">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://www.bowlsusa.us/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Bowls USA</a></li>
              <li><a href="https://worldbowls.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">World Bowls</a></li>
              <li><Link to="/the-game/rules" className="text-gray-300 hover:text-white transition-colors">Rules of the Game</Link></li>
              <li><Link to="/the-game/glossary" className="text-gray-300 hover:text-white transition-colors">Glossary</Link></li>
              <li><Link to="/the-game/history" className="text-gray-300 hover:text-white transition-colors">History</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-accent">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1 text-accent"></i>
                <span>123 San Lorenzo Blvd, Santa Cruz, CA 95060</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-phone mr-3 mt-1 text-accent"></i>
                <span>(831) 555-1234</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-envelope mr-3 mt-1 text-accent"></i>
                <span>info@santacruzlawnbowls.org</span>
              </p>
              <p className="flex items-start">
                <i className="fas fa-clock mr-3 mt-1 text-accent"></i>
                <span>Open daily 10:00 AM - 5:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Santa Cruz Lawn Bowls Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 