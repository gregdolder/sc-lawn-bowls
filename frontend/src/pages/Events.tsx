import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getEvents } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { EventClickArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import '../styles/calendar.css';
import { FaCalendarAlt, FaTrophy, FaUsers, FaGlassCheers, FaMedal } from 'react-icons/fa';

// Lazy load FullCalendar components to allow for error fallback
const FullCalendarSection = React.lazy(() => import('../components/FullCalendarSection'));

// Types for the Legend components
interface LegendItemProps {
  type: string;
  isSelected: boolean;
  onClick: (type: string) => void;
}

// Error boundary component
class CalendarErrorBoundary extends React.Component<{children: React.ReactNode, fallback: React.ReactNode}> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const LegendItem = ({ type, isSelected, onClick }: LegendItemProps) => {
  const getTypeIcon = (type: string) => {
    if (!type) return <FaCalendarAlt />;
    
    switch (type.toLowerCase()) {
      case 'tournament':
        return <FaTrophy />;
      case 'club':
        return <FaUsers />;
      case 'social':
        return <FaGlassCheers />;
      case 'league':
        return <FaMedal />;
      default:
        return <FaCalendarAlt />;
    }
  };

  const getColorClass = (type: string) => {
    if (!type) return 'bg-gray-400';
    
    switch (type.toLowerCase()) {
      case 'tournament':
        return 'bg-red-500';
      case 'club':
        return 'bg-blue-500';
      case 'social':
        return 'bg-green-500';
      case 'league':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-opacity-20 bg-gray-200 font-semibold' : 'hover:bg-opacity-10 hover:bg-gray-200'
      }`}
      onClick={() => onClick(type)}
    >
      <div className={`w-4 h-4 rounded-full ${getColorClass(type)}`} />
      <div className="text-gray-800 flex items-center gap-2">
        {getTypeIcon(type)}
        <span>{type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All'}</span>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  // State for calendar view display
  const [calendarView, setCalendarView] = useState<'dayGridMonth' | 'timeGridWeek'>('dayGridMonth');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format events for FullCalendar
  const formatEventsForCalendar = (events: any[]): any[] => {
    if (!Array.isArray(events) || events.length === 0) {
      return [];
    }

    return events.map(event => {
      if (!event) return null;

      // Generate color based on event type
      let backgroundColor = '#718096'; // Default gray color
      
      // Safely handle event type
      const eventType = event.eventType?.toLowerCase() || 'other';
      
      switch (eventType) {
        case 'tournament':
          backgroundColor = '#f56565'; // Red
          break;
        case 'club':
          backgroundColor = '#4299e1'; // Blue
          break;
        case 'social':
          backgroundColor = '#48bb78'; // Green
          break;
        case 'league':
          backgroundColor = '#ecc94b'; // Yellow
          break;
      }
      
      // Make sure startDate and endDate exist, otherwise events won't show
      const startDate = event.startDate || event.startTime;
      const endDate = event.endDate || event.endTime || 
        // Default to 2 hours after start if no end provided
        (startDate ? new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000) : null);
      
      if (!startDate) return null; // Skip events with no start date
      
      return {
        id: event.id || event._id,
        title: event.title || 'Untitled Event',
        start: startDate,
        end: endDate,
        url: `/events/${event.slug?.current || event.id || event._id}`,
        backgroundColor,
        borderColor: backgroundColor,
        textColor: '#fff',
        allDay: !event.startTime, // If no specific time, treat as all-day event
        extendedProps: {
          description: event.description || '',
          location: event.location || '',
          eventType: event.eventType || 'other'
        }
      };
    }).filter(Boolean); // Remove any null entries
  };

  // Format events for the calendar
  const calendarEvents = formatEventsForCalendar(events);

  // Filter events safely handling undefined eventType
  const filteredCalendarEvents = filter === 'all' 
    ? calendarEvents 
    : calendarEvents.filter(event => 
        event.extendedProps && 
        event.extendedProps.eventType && 
        event.extendedProps.eventType === filter
      );

  // Handle filter change
  const handleFilterChange = (type: string) => {
    setFilter(type);
  };

  // Filter events based on selected filter
  // Add safety check for undefined event.eventType
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.eventType && event.eventType === filter);

  // Get upcoming events (events with a start date in the future)
  const upcomingEvents = filteredEvents.filter(
    event => new Date(event.startDate) >= new Date()
  );

  // Get past events (events with a start date in the past)
  const pastEvents = filteredEvents.filter(
    event => new Date(event.startDate) < new Date()
  ).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()); // Sort by date descending
  
  // Handle calendar view change
  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek'): void => {
    setCalendarView(view);
  };

  // Handle calendar event click
  const handleEventClick = (info: EventClickArg): void => {
    if (!info || !info.jsEvent) return;
    
    info.jsEvent.preventDefault(); // Prevent the default action
    if (info.event && info.event.url) {
      window.location.href = info.event.url;
    }
  };

  // Handle calendar date click
  const handleDateClick = (arg: DateClickArg): void => {
    console.log('Date clicked:', arg.dateStr);
  };

  // Simplified fallback calendar view
  const SimplifiedCalendarView = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary">Upcoming Events by Date</h3>
        <p className="text-sm text-gray-600 mt-2">Interactive calendar unavailable. Showing simplified view instead.</p>
      </div>
      
      {upcomingEvents.length > 0 ? (
        <div className="space-y-4">
          {/* Group events by date */}
          {Array.from(
            new Set(upcomingEvents.map(event => 
              format(new Date(event.startDate), 'yyyy-MM-dd')
            ))
          ).sort().map(dateStr => {
            const dateEvents = upcomingEvents.filter(event => 
              format(new Date(event.startDate), 'yyyy-MM-dd') === dateStr
            );
            
            return (
              <div key={dateStr} className="border-l-4 border-primary-light pl-4 py-2">
                <h4 className="font-bold text-lg text-gray-800 mb-2">
                  {format(new Date(dateStr), 'EEEE, MMMM d, yyyy')}
                </h4>
                <div className="space-y-2">
                  {dateEvents.map(event => (
                    <div key={event._id} className="flex items-start">
                      <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 mr-2 ${
                        !event.eventType ? 'bg-[#38B2AC]' :
                        event.eventType === 'tournament' ? 'bg-[#FFB800]' :
                        event.eventType === 'social' ? 'bg-[#0066CC]' :
                        event.eventType === 'instruction' ? 'bg-[#4299E1]' :
                        event.eventType === 'meeting' ? 'bg-[#718096]' :
                        'bg-[#38B2AC]'
                      }`}></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.title}</span>
                          <span className="text-sm text-gray-600">
                            {format(new Date(event.startDate), 'h:mm a')}
                          </span>
                        </div>
                        <Link 
                          to={`/events/${event.slug?.current || event.id}`} 
                          className="text-sm text-primary hover:underline"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">
          No upcoming events{filter !== 'all' ? ` of type "${filter}"` : ''} at this time.
        </p>
      )}
      
      {/* Event type legend */}
      <div className="event-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f56565' }}></span>
          <span className="text-sm">Tournament</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4299e1' }}></span>
          <span className="text-sm">Club</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#48bb78' }}></span>
          <span className="text-sm">Social</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ecc94b' }}></span>
          <span className="text-sm">League</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#718096' }}></span>
          <span className="text-sm">Other</span>
        </div>
      </div>
    </div>
  );

  // Past Events Section
  const renderPastEvents = () => {
    const pastEvents = events
      .filter(event => new Date(event.startTime) < new Date())
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    return (
      <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Past Events</h2>
        <div className="space-y-4">
          {pastEvents.length === 0 ? (
            <p className="text-gray-600">No past events to display.</p>
          ) : (
            pastEvents.slice(0, 5).map(event => (
              <div key={event.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium text-lg text-green-700">
                  <a href={`/events/${event.id}`} className="hover:underline">
                    {event.title}
                  </a>
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span className="mr-2">
                    {new Date(event.startTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="mr-2">•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.eventType === 'tournament' ? 'bg-red-100 text-red-800' :
                    event.eventType === 'club' ? 'bg-blue-100 text-blue-800' :
                    event.eventType === 'social' ? 'bg-green-100 text-green-800' :
                    event.eventType === 'league' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.eventType ? event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1) : 'Event'}
                  </span>
                </div>
                {event.description && (
                  <p className="text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                )}
              </div>
            ))
          )}
        </div>
        {pastEvents.length > 5 && (
          <div className="mt-4 text-center">
            <button 
              className="text-green-700 hover:text-green-900 font-medium"
              onClick={() => {/* Handle view more */}}
            >
              View all past events
            </button>
          </div>
        )}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Events & Calendar</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Join us for tournaments, social gatherings, and instructional sessions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Filters */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('tournament')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'tournament'
                  ? 'bg-accent text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tournaments
            </button>
            <button
              onClick={() => setFilter('social')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'social'
                  ? 'bg-primary-light text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Social Events
            </button>
            <button
              onClick={() => setFilter('instruction')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'instruction'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => setFilter('meeting')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'meeting'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Meetings
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div>
              {/* Upcoming Events */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-primary mb-8">Upcoming Events</h2>
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                              ${event.eventType === 'tournament' ? 'bg-accent/20 text-secondary' :
                               event.eventType === 'social' ? 'bg-primary/20 text-primary' :
                               event.eventType === 'instruction' ? 'bg-blue-100 text-blue-600' :
                               event.eventType === 'meeting' ? 'bg-secondary/20 text-secondary' :
                               'bg-gray-100 text-gray-600'}`
                            }>
                              {event.eventType ? event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1) : 'Event'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {format(new Date(event.startDate), 'MMM d, yyyy')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {format(new Date(event.startDate), 'h:mm a')}
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
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No upcoming events{filter !== 'all' ? ` of type "${filter}"` : ''} at this time.
                  </p>
                )}
              </div>

              {/* Past Events */}
              {renderPastEvents()}
            </div>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-background-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Calendar View</h2>
            <p className="text-lg max-w-3xl mx-auto mb-6">
              Plan your visits to the club with our calendar of events
            </p>
            
            {/* Calendar view toggles */}
            <div className="flex justify-center gap-3 mb-6">
              <button 
                onClick={() => handleViewChange('dayGridMonth')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calendarView === 'dayGridMonth'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month View
              </button>
              <button 
                onClick={() => handleViewChange('timeGridWeek')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calendarView === 'timeGridWeek'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Week View
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <CalendarErrorBoundary fallback={<SimplifiedCalendarView />}>
                <Suspense fallback={
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                }>
                  <div className="w-full overflow-x-auto">
                    <FullCalendarSection
                      events={filteredCalendarEvents}
                      view={calendarView}
                      onViewChange={handleViewChange}
                      onEventClick={handleEventClick}
                      onDateClick={handleDateClick}
                      eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short'
                      }}
                    />
                  </div>
                </Suspense>
              </CalendarErrorBoundary>
            )}
            
            {/* Event type legend */}
            <div className="event-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f56565' }}></span>
                <span className="text-sm">Tournament</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4299e1' }}></span>
                <span className="text-sm">Club</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#48bb78' }}></span>
                <span className="text-sm">Social</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#ecc94b' }}></span>
                <span className="text-sm">League</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#718096' }}></span>
                <span className="text-sm">Other</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Whether you're a beginner or experienced player, we'd love to see you at our next event.
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

export default Events; 