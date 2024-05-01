import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventStyle.css";

moment.locale("en-gb");

const localizer = momentLocalizer(moment);

const MyCalendar = ({
  events,
  bookedDates,
  eventStyleGetter,
  handleColumnClick,
}) => {
  const handleSlotSelect = ({ start, end }) => {
    // Pass the selected column information to the parent component
    handleColumnClick(start, end);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        disabledDates={bookedDates}
        eventPropGetter={eventStyleGetter}
        views={["month", "agenda"]}
        selectable
        onSelectSlot={handleSlotSelect} // Call handleSlotSelect when a slot is selected
      />
    </div>
  );
};

export default MyCalendar;
