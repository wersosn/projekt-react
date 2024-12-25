import React from 'react';
import './Kalendarz.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Kalendarz: React.FC = () => {
  const calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth'
  };

  return (
    <div>
      <FullCalendar
        {...calendarOptions}
      />
    </div>
  );
};

export default Kalendarz;
