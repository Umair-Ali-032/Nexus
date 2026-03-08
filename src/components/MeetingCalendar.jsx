import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function MeetingCalendar() {
const [events, setEvents] = useState([
  { title: "Investor Meeting", date: "2026-03-10" }
]);
 const handleDateClick = (info) => {
  const title = prompt("Enter availability slot");

  if (title) {
    setEvents([...events, { title, date: info.dateStr }]);
  }
};
  return (
    <div>
      <h2>Meeting Calendar</h2>
{/* comm */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
      />

    </div>
  );
}

export default MeetingCalendar;