import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

interface FullCalendarSectionProps {
  events: EventInput[];
  onEventClick?: (event: any) => void;
  onDateClick?: (date: any) => void;
}

const FullCalendarSection: React.FC<FullCalendarSectionProps> = ({
  events,
  onEventClick,
  onDateClick
}) => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={onEventClick}
        dateClick={onDateClick}
        eventDisplay="block"
      />
    </div>
  );
};

export default FullCalendarSection; 