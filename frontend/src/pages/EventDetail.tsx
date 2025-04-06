import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sanityClient, urlFor } from '../lib/sanity';
import { format } from 'date-fns';

interface EventDetailProps {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  eventType: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  image?: any;
  registrationUrl?: string;
  registrationRequired: boolean;
}

const EventDetail: React.FC = () => {
  const [event, setEvent] = useState<EventDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        
        const query = `*[_type == "event" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          eventType,
          startDate,
          endDate,
          location,
          description,
          image,
          registrationUrl,
          registrationRequired
        }`;
        
        const eventData = await sanityClient.fetch(query, { slug });
        
        if (!eventData) {
          setError('Event not found');
          return;
        }
        
        setEvent(eventData);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchEventDetails();
    }
  }, [slug]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Error</h1>
        <p className="text-xl mb-8">{error || 'Event not found'}</p>
        <button 
          onClick={handleGoBack}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Event Image */}
      <section className="relative pt-20 md:pt-24">
        {event.image ? (
          <div 
            className="h-96 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${urlFor(event.image).width(1600).url()})` 
            }}
          >
            <div className="container-custom h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white max-w-3xl"
              >
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${event.eventType === 'tournament' ? 'bg-accent text-secondary' :
                     event.eventType === 'social' ? 'bg-primary-light text-white' :
                     event.eventType === 'instruction' ? 'bg-blue-500 text-white' :
                     event.eventType === 'meeting' ? 'bg-secondary text-white' :
                     'bg-gray-100 text-gray-800'}`
                  }>
                    {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                  </span>
                  <span className="ml-3 text-gray-200">
                    {format(new Date(event.startDate), 'MMMM d, yyyy')}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                <button 
                  onClick={handleGoBack}
                  className="mt-4 flex items-center text-white hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Events
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="bg-primary py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white max-w-3xl"
              >
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${event.eventType === 'tournament' ? 'bg-accent text-secondary' :
                     event.eventType === 'social' ? 'bg-primary-light text-white' :
                     event.eventType === 'instruction' ? 'bg-blue-500 text-white' :
                     event.eventType === 'meeting' ? 'bg-secondary text-white' :
                     'bg-gray-100 text-gray-800'}`
                  }>
                    {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                  </span>
                  <span className="ml-3 text-gray-200">
                    {format(new Date(event.startDate), 'MMMM d, yyyy')}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                <button 
                  onClick={handleGoBack}
                  className="mt-4 flex items-center text-white hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Events
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-primary mb-6">About This Event</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="whitespace-pre-line">{event.description}</p>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-background-light p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-primary mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-primary mr-3 mt-1">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p>{format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}</p>
                      <p>{format(new Date(event.startDate), 'h:mm a')}</p>
                      {event.endDate && (
                        <p>to {format(new Date(event.endDate), 'h:mm a')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-primary mr-3 mt-1">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  
                  {event.registrationRequired && (
                    <div className="flex items-start">
                      <div className="text-primary mr-3 mt-1">
                        <i className="fas fa-clipboard-check"></i>
                      </div>
                      <div>
                        <p className="font-semibold">Registration</p>
                        <p className="text-red-600">Registration Required</p>
                      </div>
                    </div>
                  )}

                  {event.registrationUrl && (
                    <a 
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent w-full text-center mt-6"
                    >
                      Register Now
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <Link to="/contact" className="btn btn-primary w-full text-center">
                  <i className="fas fa-question-circle mr-2"></i> Questions? Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* More Events Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Interested in More Events?</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Check out our upcoming events or contact us to learn more about our club activities
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/events" className="btn btn-primary">
              View All Events
            </Link>
            <Link to="/the-club" className="btn btn-secondary">
              Learn About Our Club
            </Link>
            <Link to="/join" className="btn btn-accent">
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail; 