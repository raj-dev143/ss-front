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
    // Set the start time to 8:00 AM
    const startTime = new Date(start);
    startTime.setHours(8, 0, 0, 0);

    // Set the end time to 8:00 PM
    const endTime = new Date(end);
    endTime.setHours(20, 0, 0, 0);

    // Pass the adjusted start and end times to the handleColumnClick function
    handleColumnClick(startTime, endTime);
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
        selectable
        onSelectSlot={handleSlotSelect} // Call handleSlotSelect when a slot is selected
      />
    </div>
  );
};

export default MyCalendar;
