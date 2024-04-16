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
  ball: "",
};

function Home() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

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
    setFormData({
      ...formData,
      [name]: value,
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
      !formData.ball
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
    setFormData(initialFormState);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = "blue";
    const today = moment().startOf("day");
    if (moment(event.start).startOf("day").isBefore(today)) {
      return { style: { backgroundColor: "lightgrey" } };
    }
    return { style: { backgroundColor } };
  };

  const handleColumnClick = (start, end) => {
    // Format the clicked dates to match the format expected by the input fields
    const formattedStartDate = moment(start).format("YYYY-MM-DDTHH:mm");
    const formattedEndDate = moment.utc(end).format("YYYY-MM-DDTHH:mm");

    // If a single date is selected, set both start and end dates to the selected date
    if (moment(start).isSame(end, "day")) {
      setFormData({
        ...formData,
        start: formattedStartDate,
        end: formattedEndDate,
      });
    } else {
      // If a date range is selected, set start and end dates accordingly
      setFormData({
        ...formData,
        start: formattedStartDate,
        end: formattedEndDate,
      });
    }

    // Open the popup
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
      <Box textAlign="center">
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginBottom: 20 }}
        >
          Book Now
        </Button>
      </Box>
      <EventForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
      />
      <EventTable events={events} />
    </Box>
  );
}

export default Home;
