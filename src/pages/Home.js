import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyCalendar from "../components/Calendar/Calendar";
import EventForm from "../components/EventForm/EventForm";
import EventTable from "../components/EventTable/EventTable";
import { Box } from "@mui/material";
import "moment/locale/en-gb";

moment.locale("en-gb");

const initialFormState = {
  title: "",
  bookedBy: "",
  start: "",
  end: "",
  charges: "",
  ground: "",
  ball: "",
  food: "",
};

function Home() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventIdToEdit, setEventIdToEdit] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/events`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      const formattedData = data.map(({ start, end, ...event }) => ({
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
        ...event,
      }));

      setEvents(formattedData);
      const bookedDates = formattedData.map((event) =>
        moment(event.start).format("YYYY-MM-DD")
      );
      setBookedDates(bookedDates);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch events");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert the date value to ISO string format if it's a date field
    const updatedValue =
      name === "start" || name === "end"
        ? new Date(value).toISOString()
        : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.bookedBy ||
      !formData.start ||
      !formData.end ||
      !formData.charges ||
      !formData.ground ||
      !formData.ball ||
      !formData.food
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Check if end time is greater than start time
    const startTime = moment(formData.start);
    const endTime = moment(formData.end);
    if (endTime.isBefore(startTime)) {
      toast.error("End time must be greater than start time.");
      return;
    }

    try {
      const url = isEditMode
        ? `${process.env.REACT_APP_BASE_URL}/api/events/${eventIdToEdit}`
        : `${process.env.REACT_APP_BASE_URL}/api/events`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          isEditMode ? "Failed to update event" : "Failed to add event"
        );
      }

      const data = await response.json();
      const newEvent = data.event;
      if (isEditMode) {
        const updatedEvents = events.map((event) =>
          event._id === newEvent._id ? newEvent : event
        );
        setEvents(updatedEvents);
      } else {
        setEvents([...events, newEvent]);
      }
      toast.success(data.message);
      setFormData(initialFormState);
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(
        isEditMode ? "Failed to update event" : "Failed to add event"
      );
    }
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormState);
    setIsEditMode(false);
    setEventIdToEdit(null);
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event._id === eventId);
    setFormData(eventToEdit);
    setIsEditMode(true);
    setEventIdToEdit(eventId);
    handleOpen();
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/events/${eventId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
        const data = await response.json();
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setEvents(updatedEvents);
        toast.success(data.message);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete event");
      }
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = "blue";
    const today = moment().startOf("day");
    if (moment(event.start).startOf("day").isBefore(today)) {
      return { style: { backgroundColor: "lightgrey" } };
    }
    return { style: { backgroundColor } };
  };

  // const handleColumnClick = (start, end) => {
  //   const formattedStartDate = moment(start).toISOString();
  //   const formattedEndDate = moment(end).toISOString();

  //   setFormData({
  //     ...formData,
  //     start: formattedStartDate,
  //     end: formattedEndDate,
  //   });

  //   handleOpen();
  // };

  const handleColumnClick = (start, end) => {
    const formattedStartDate = moment(start).toISOString();
    let formattedEndDate = moment(end).toISOString();

    // If it's a multi-day event, subtract one day from the end date
    if (!moment(start).isSame(end, "day")) {
      formattedEndDate = moment(end).subtract(1, "day").toISOString();
    }

    setFormData({
      ...formData,
      start: formattedStartDate,
      end: formattedEndDate,
    });

    handleOpen();
  };

  return (
    <Box sx={{ p: 2 }}>
      <ToastContainer />
      <MyCalendar
        events={events}
        bookedDates={bookedDates}
        eventStyleGetter={eventStyleGetter}
        handleColumnClick={handleColumnClick}
      />
      <EventForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
        isEditMode={isEditMode}
      />
      <EventTable
        events={events}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default Home;
