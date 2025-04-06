import React, { useState, useEffect } from 'react';
import { getEvents } from '../lib/sanity';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  type: string;
  description?: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter;
  });

  const upcomingEvents = filteredEvents.filter(
    event => new Date(event.start) >= new Date()
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="mb-8">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Events</option>
          <option value="tournament">Tournaments</option>
          <option value="social">Social Events</option>
        </select>
      </div>
      <div className="grid gap-6">
        {upcomingEvents.map(event => (
          <div key={event.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-gray-600">{new Date(event.start).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events; 