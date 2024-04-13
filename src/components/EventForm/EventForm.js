import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";

const EventForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  open,
}) => {
  const { user } = useAuth0();

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
                value={user.name}
                onChange={handleChange}
                label="Full Name"
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
