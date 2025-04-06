import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getFeaturedEvents } from '../lib/sanity';
import { format } from 'date-fns';
import { urlFor } from '../lib/sanity';

const Home: React.FC = () => {
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);
  
  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        const events = await getFeaturedEvents();
        setFeaturedEvents(events);
      } catch (error) {
        console.error('Error loading featured events:', error);
      }
    };
    
    loadFeaturedEvents();
  }, []);

  const heroImages = [
    '/images/lawn-bowling-group.webp',
    '/images/hero1.jpg',
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[80vh] h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Hero Background with Parallax Effect */}
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImages[0]})`,
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Hero Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Santa Cruz <span className="text-accent">Lawn Bowls</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              Join us for friendly competition and camaraderie on the green in beautiful Santa Cruz, California
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/the-game" className="btn btn-accent">
                Learn the Game
              </Link>
              <Link to="/join" className="btn bg-white text-primary hover:bg-gray-100">
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <button 
            onClick={() => window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })} 
            className="text-white focus:outline-none"
            aria-label="Scroll down"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </motion.div>
      </motion.section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Welcome to Our Club</h2>
              <p className="text-lg mb-6">
                The Santa Cruz Lawn Bowls Club has been a cornerstone of the Santa Cruz community for over 50 years. Our pristine greens and welcoming atmosphere make us the perfect place to learn and enjoy this classic sport.
              </p>
              <p className="text-lg mb-6">
                Whether you're a seasoned player or completely new to the game, our club offers something for everyone. Join us for friendly competition, social events, and the opportunity to be part of a thriving community.
              </p>
              <Link to="/the-club" className="btn btn-primary">
                About Our Club
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="/src/assets/logos/logo-centered.png" 
                alt="Santa Cruz Lawn Bowls Club" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 md:py-24 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
              <p className="text-lg max-w-3xl mx-auto">
                Join us for tournaments, social gatherings, and instructional sessions. There's always something happening at the Santa Cruz Lawn Bowls Club!
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.length > 0 ? (
              featuredEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    {event.image ? (
                      <img 
                        src={urlFor(event.image).width(500).url()} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${event.eventType === 'tournament' ? 'bg-accent/20 text-secondary' :
                         event.eventType === 'social' ? 'bg-primary/20 text-primary' :
                         event.eventType === 'instruction' ? 'bg-blue-100 text-blue-600' :
                         'bg-gray-100 text-gray-600'}`
                      }>
                        {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {format(new Date(event.startDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {event.description.length > 100 
                        ? `${event.description.substring(0, 100)}...` 
                        : event.description
                      }
                    </p>
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/events/${event.slug.current}`} 
                        className="text-primary font-medium hover:underline"
                      >
                        View Details
                      </Link>
                      {event.registrationRequired && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          Registration Required
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-8">
                <p className="text-gray-500">No upcoming events to display at this time.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events" className="btn btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Why Play Lawn Bowls Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Play Lawn Bowls?</h2>
              <p className="text-lg max-w-3xl mx-auto">
                Lawn bowls is a sport for everyone - it's easy to learn, challenging to master, and offers numerous benefits.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-heart",
                title: "Health & Wellness",
                description: "Enjoy gentle physical activity with cardiovascular benefits and improved coordination in the fresh, outdoor air."
              },
              {
                icon: "fa-user-friends",
                title: "Social Connection",
                description: "Build lasting friendships and enjoy a supportive community through regular social interaction."
              },
              {
                icon: "fa-brain",
                title: "Mental Stimulation",
                description: "Develop strategy and concentration skills while keeping your mind sharp and engaged."
              },
              {
                icon: "fa-users",
                title: "All Ages & Abilities",
                description: "A truly inclusive sport that can be enjoyed by people of all ages and physical abilities."
              },
              {
                icon: "fa-medal",
                title: "Competitive Spirit",
                description: "Challenge yourself through friendly competition and tournaments at local and national levels."
              },
              {
                icon: "fa-laugh",
                title: "Fun & Enjoyment",
                description: "Most importantly, lawn bowls is fun! The perfect balance of relaxation and excitement."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary text-4xl mb-4">
                  <i className={`fas ${benefit.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Give It a Try?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join us for an introductory session or become a member today. We provide all the equipment and instruction you need to get started.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
                Contact Us
              </Link>
              <Link to="/join" className="btn btn-accent">
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 