import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getEvents, urlFor } from '../lib/sanity';

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  image: any;
  isFeatured: boolean;
  registrationUrl?: string;
  registrationRequired: boolean;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Animation controls
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.eventType === selectedFilter;
  });

  // Separate upcoming and past events
  const currentDate = new Date();
  
  // Helper to safely parse dates
  const parseDate = (dateString: string): Date => {
    try {
      return new Date(dateString);
    } catch (error) {
      console.error('Error parsing date:', error, dateString);
      return new Date(); // Return current date as fallback
    }
  };
  
  const upcomingEvents = filteredEvents.filter(event => {
    try {
      return parseDate(event.startDate) >= currentDate;
    } catch (error) {
      console.error('Error comparing dates for event:', event._id, error);
      return false;
    }
  });

  const pastEvents = filteredEvents.filter(event => {
    try {
      return parseDate(event.startDate) < currentDate;
    } catch (error) {
      console.error('Error comparing dates for event:', event._id, error);
      return true; // Show in past events if there's an error
    }
  }).slice(0, 5); // Only show 5 most recent past events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        console.log('Fetched events from Sanity:', data);
        
        // Check if we got valid data
        if (!data || data.length === 0) {
          console.warn('No events returned from Sanity');
          // Add some fallback events for testing if none exist
          const fallbackEvents = [
            {
              _id: 'fallback-1',
              title: 'Spring Tournament',
              slug: { current: 'spring-tournament' },
              eventType: 'tournament',
              startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
              endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
              location: 'Santa Cruz Lawn Bowls Green',
              description: 'Our annual spring tournament with teams from across Northern California.',
              isFeatured: true,
              registrationRequired: true,
              image: null
            },
            {
              _id: 'fallback-2',
              title: 'Summer Social Gathering',
              slug: { current: 'summer-social' },
              eventType: 'social',
              startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
              endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
              location: 'Santa Cruz Lawn Bowls Clubhouse',
              description: 'Join us for food, drinks and friendly lawn bowling with club members.',
              isFeatured: false,
              registrationRequired: false,
              image: null
            }
          ];
          setEvents(fallbackEvents);
        } else {
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateString);
        return 'Date not available';
      }
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return dateString || 'Date not available';
    }
  };

  // Simplified date for calendar view
  const formatCalendarDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid calendar date:', dateString);
        return 'TBD';
      }
      
      const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric'
      };
      
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting calendar date:', error, dateString);
      return 'TBD';
    }
  };

  // Calendar helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getPreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const getNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Get events for this month
    const monthEvents = filteredEvents.filter(event => {
      const eventDate = parseDate(event.startDate);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
    
    // Group events by day
    const eventsByDay: {[key: number]: Event[]} = {};
    monthEvents.forEach(event => {
      const day = parseDate(event.startDate).getDate();
      if (!eventsByDay[day]) {
        eventsByDay[day] = [];
      }
      eventsByDay[day].push(event);
    });
    
    // Create calendar grid
    const calendarDays = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="border p-2 bg-gray-50"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;
      
      const dayEvents = eventsByDay[day] || [];
      const hasEvents = dayEvents.length > 0;
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`border p-2 min-h-[100px] ${isToday ? 'bg-primary-light bg-opacity-10' : ''}`}
        >
          <div className={`text-right ${isToday ? 'font-bold text-primary' : ''}`}>
            {day}
          </div>
          
          {hasEvents && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map(event => (
                <Link 
                  key={event._id} 
                  to={`/events/${event.slug?.current || event._id}`}
                  className={`block text-xs rounded px-1 py-0.5 truncate 
                    ${event.eventType === 'tournament' ? 'bg-accent text-white' : 
                     event.eventType === 'social' ? 'bg-primary text-white' : 
                     'bg-gray-200'}`}
                >
                  {event.title}
                </Link>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 italic">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary text-white py-3 px-4 flex justify-between items-center">
          <button 
            onClick={getPreviousMonth}
            className="text-white hover:text-gray-200"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <h4 className="text-xl font-bold">
            {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </h4>
          <button 
            onClick={getNextMonth}
            className="text-white hover:text-gray-200"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="grid grid-cols-7 bg-gray-100">
          {dayNames.map(day => (
            <div key={day} className="py-2 text-center font-medium text-gray-700 border-b">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {calendarDays}
        </div>
        
        <div className="p-3 border-t">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-accent mr-1"></div>
              <span>Tournament</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
              <span>Social</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 mr-1"></div>
              <span>Other</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: "url('/images/warmups.jpg')" }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Events</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Tournaments, social gatherings, and special club activities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-background-light">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Club Events and Activities</h2>
            <p className="text-lg mb-8">
              Santa Cruz Lawn Bowls Club hosts a variety of events throughout the year, including tournaments, 
              social gatherings, open houses, and special club activities. Join us to experience the fun and camaraderie 
              of lawn bowling in a beautiful setting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">
              <p>{error}</p>
              <p className="mt-2">Please check back later or contact us for event information.</p>
            </div>
          ) : (
            <>
              {/* Filter and View Controls */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="flex space-x-2 mb-4 md:mb-0">
                  <button 
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-full font-medium ${
                      selectedFilter === 'all' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    All Events
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('tournament')}
                    className={`px-4 py-2 rounded-full font-medium ${
                      selectedFilter === 'tournament' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Tournaments
                  </button>
                  <button 
                    onClick={() => setSelectedFilter('social')}
                    className={`px-4 py-2 rounded-full font-medium ${
                      selectedFilter === 'social' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Social Events
                  </button>
                </div>
                <div className="flex border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    <i className="fas fa-list-ul mr-2"></i>Card View
                  </button>
                  <button 
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 ${viewMode === 'calendar' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>Calendar View
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  {viewMode === 'list' ? 'Upcoming Events' : 'Event Calendar'}
                </h3>
                
                {viewMode === 'list' ? (
                  upcomingEvents.length === 0 ? (
                    <p className="text-center py-8 bg-gray-50 rounded-lg">No upcoming events found. Check back soon!</p>
                  ) : (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate={controls}
                    >
                      {upcomingEvents.map(event => {
                        console.log('Rendering event card:', event);
                        return (
                        <motion.div 
                          key={event._id}
                          variants={itemVariants}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="h-48 overflow-hidden relative">
                            {event.image ? (
                              <img 
                                src={urlFor(event.image).width(600).url()}
                                alt={event.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img 
                                src="/images/warmups.jpg" 
                                alt="Default event" 
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                              {event.eventType || 'Event'}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                            <p className="text-gray-600 mb-2">
                              <i className="far fa-calendar-alt mr-2"></i>
                              {formatDate(event.startDate)}
                            </p>
                            <p className="text-gray-600 mb-3">
                              <i className="fas fa-map-marker-alt mr-2"></i>
                              {event.location || 'Location TBA'}
                            </p>
                            <p className="text-gray-700 mb-4 line-clamp-2">{event.description || 'No description available'}</p>
                            <Link 
                              to={`/events/${event.slug?.current || event._id}`}
                              className="btn btn-primary w-full text-center"
                            >
                              View Details
                            </Link>
                          </div>
                        </motion.div>
                      )})}
                    </motion.div>
                  )
                ) : (
                  // Monthly calendar view
                  renderCalendar()
                )}
              </div>

              {/* Past Events - only show in list view */}
              {viewMode === 'list' && pastEvents.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-6">Recent Past Events</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm divide-y">
                    {pastEvents.map(event => (
                      <div key={event._id} className="p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-500">
                            {formatDate(event.startDate)}
                          </div>
                          <h4 className="text-lg font-semibold">{event.title}</h4>
                          <div className="ml-auto">
                            <span className="text-sm px-3 py-1 bg-gray-200 rounded-full">
                              {event.eventType}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events; 