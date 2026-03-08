
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function MeetingCalendar() {

  const handleDateClick = (info) => {
    alert("Selected date: " + info.dateStr);
  };

  return (
    <div>
      <h2>Meeting Calendar</h2>
{/* comm */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={[
          { title: "Investor Meeting", date: "2026-03-10" }
        ]}
      />

    </div>
  );
}

export default MeetingCalendar;