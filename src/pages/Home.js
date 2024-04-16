import React, { useState, useEffect } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import MyCalendar from "../components/Calendar/Calendar";
import EventForm from "../components/EventForm/EventForm";
import EventTable from "../components/EventTable/EventTable";
import { Box } from "@mui/material";

const initialFormState = {
  title: "",
  bookedBy: "",
  start: "",
  end: "",
  charges: "",
  ground: "",
  ball: "", // Add 'ground' field to initial form state
};

function Home() {
  // State variables
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/events`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      // Convert start and end dates to the specified format
      const formattedData = data.map(({ start, end, ...event }) => ({
        start: new Date(Date.parse(start)),
        end: new Date(Date.parse(end)),
        ...event,
      }));

      setEvents(formattedData);
      // Update booked dates based on fetched events
      const bookedDates = formattedData.map((event) =>
        moment(event.start).format("YYYY-MM-DD")
      );
      setBookedDates(bookedDates);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch events");
    }
  };

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.title ||
      !formData.bookedBy ||
      !formData.start ||
      !formData.end ||
      !formData.charges ||
      !formData.ground ||
      !formData.ball // Check if 'ground' is empty
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      const data = await response.json();
      const newEvent = data.event;
      setEvents([...events, newEvent]);
      toast.success(data.message);
      setFormData(initialFormState);
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add event");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = "blue"; // Set a uniform background color for all events
    const today = moment().startOf("day");
    if (moment(event.start).startOf("day").isBefore(today)) {
      return { style: { backgroundColor: "lightgrey" } }; // Disable past events
    }
    return { style: { backgroundColor } };
  };

  return (
    <Box sx={{ p: 2 }}>
      <ToastContainer />
      {/* Calendar component */}
      <MyCalendar
        events={events}
        bookedDates={bookedDates}
        eventStyleGetter={eventStyleGetter}
      />
      {/* Button to open add event dialog */}
      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginBottom: 20 }}
        >
          Book Now
        </Button>
      </Box>
      {/* Add event dialog */}
      <EventForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
      />
      {/* Table of events */}
      <EventTable events={events} />
    </Box>
  );
}

export default Home;
