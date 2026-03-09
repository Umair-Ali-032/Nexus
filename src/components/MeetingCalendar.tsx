import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

const MeetingCalendar = () => {

  const [events, setEvents] = useState<any[]>([
    { title: "Investor Meeting", date: "2026-03-10" }
  ]);

  const handleDateClick = (info: DateClickArg) => {
    const title = prompt("Enter availability slot");

    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Meeting Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
      />
    </div>
  );
};

export default MeetingCalendar;