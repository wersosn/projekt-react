import React, { useEffect, useState } from 'react';
import './Kalendarz.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import { EventService, Event } from '../../event.service';

const Kalendarz: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const eventService = new EventService();
    eventService.fetchEvents();
    eventService.events$.subscribe(fetchedEvents => {
      setEvents(fetchedEvents);
      const formattedEvents = fetchedEvents.map(event => ({
        id: event.id,
        title: `${event.title} - ${event.time}`,
        date: event.date
      }));
      setCalendarEvents(formattedEvents);
    });
  }, []);

  const handleEventClick = (event: any) => {
    navigate(`/akcja/szczegóły/${event.event._def.publicId}`);
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: calendarEvents,
    eventClick: handleEventClick
  };

  return (
    <div>
      <FullCalendar {...calendarOptions} />
    </div>
  );
};

export default Kalendarz;
