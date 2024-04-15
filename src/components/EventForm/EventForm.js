import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const EventForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  open,
}) => {
  const today = new Date().toISOString().slice(0, 16); // Get today's date

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ paddingBottom: 0 }}>Book Ground</DialogTitle>
      <Box style={{ flex: 1 }}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                label="Booked For"
                required // Add required attribute for validation
              />
              <TextField
                type="text"
                name="bookedBy"
                value={formData.bookedBy}
                onChange={handleChange}
                label="Booked By"
                required // Add required attribute for validation
              />
              <TextField
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleChange}
                label="Event Start Date"
                required // Add required attribute for validation
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today, // Set min attribute to today's date
                }}
              />
              <TextField
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleChange}
                label="Event End Date"
                required // Add required attribute for validation
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today, // Set min attribute to today's date
                }}
              />
              <TextField
                type="number"
                name="charges"
                value={formData.charges}
                onChange={handleChange}
                label="Charges"
                required // Add required attribute for validation
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Book Now
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventForm;
