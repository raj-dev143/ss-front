import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventStyle.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, bookedDates, eventStyleGetter }) => {
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
      />
    </div>
  );
};

export default MyCalendar;
