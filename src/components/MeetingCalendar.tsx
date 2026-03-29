import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";


const MeetingCalendar = () => {

  const [events, setEvents] = useState<any[]>([
    { id: 1, title : "Investor Meeting", date: "2026-03-10" }
  ]);
    // ADD SLOT
  const handleDateClick = (info: DateClickArg) => {
    const title = prompt("Enter availability slot (example: 2pm - 4pm)");

    if (title) {
      setEvents([
  ...events,
  { id: Date.now(), title, date: info.dateStr }
]);
    }
  };

  // EDIT OR DELETE SLOT
  const handleEventClick = (clickInfo: EventClickArg) => {

    const action = prompt(
      `Slot: ${clickInfo.event.title}\n\nType:\nedit → edit slot\ndelete → delete slot`
    );

    // DELETE SLOT
    if (action === "delete") {
      const confirmDelete = confirm("Are you sure you want to delete this slot?");
      if (confirmDelete) {
        setEvents(events.filter(e => e.id != clickInfo.event.id));
      }
    }

    // EDIT SLOT
    if (action === "edit") {
      const newTitle = prompt("Enter new availability slot", clickInfo.event.title);

      if (newTitle) {
        setEvents(events.map(e =>
          e.date == clickInfo.event.id
            ? { ...e, title: newTitle }
            : e
        ));
      }
    }

  };
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Meeting Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
      />
    </div>
  );
};

export default MeetingCalendar;