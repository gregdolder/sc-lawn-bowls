import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';

interface FullCalendarSectionProps {
  events: EventInput[];
  view: 'dayGridMonth' | 'timeGridWeek';
  onViewChange: (view: 'dayGridMonth' | 'timeGridWeek') => void;
  onEventClick: (info: EventClickArg) => void;
  onDateClick: (arg: DateClickArg) => void;
  eventTimeFormat: {
    hour: string;
    minute: string;
    meridiem: string;
  };
}

const FullCalendarSection: React.FC<FullCalendarSectionProps> = ({
  events,
  view,
  onEventClick,
  onDateClick,
  eventTimeFormat
}) => {
  // Ensure events is always an array even if it's undefined
  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <div className="calendar-container">
      <FullCalendar
        key={`calendar-${view}-${safeEvents.length}`}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        events={safeEvents}
        eventClick={onEventClick}
        dateClick={onDateClick}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        height="auto"
        fixedWeekCount={false}
        dayMaxEvents={true}
        eventDisplay="block"
        stickyHeaderDates={true}
      />
    </div>
  );
};

export default FullCalendarSection; 