import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import DatetimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Paper from "@mui/material/Paper";

const EventForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  open,
  isEditMode,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle style={{ paddingBottom: 0 }}>
        {isEditMode ? "Edit Event" : "Book Ground"}
      </DialogTitle>
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
                required
                fullWidth
              />
              <TextField
                type="text"
                name="bookedBy"
                value={formData.bookedBy}
                onChange={handleChange}
                label="Booked By"
                required
                fullWidth
              />
              <Box sx={{ ml: -2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      name="ground"
                      value={formData.ground}
                      onChange={handleChange}
                      label="Ground"
                      required
                      fullWidth
                    >
                      <MenuItem value="SSCA">SSCA</MenuItem>
                      <MenuItem value="SS Cricket Commune">
                        SS Cricket Commune
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      name="ball"
                      value={formData.ball}
                      onChange={handleChange}
                      label="Ball"
                      required
                      fullWidth
                    >
                      <MenuItem value="Leather">Leather</MenuItem>
                      <MenuItem value="Tennis">Tennis</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              <TextField
                type="number"
                name="charges"
                value={formData.charges}
                onChange={handleChange}
                label="Charges"
                required
                fullWidth
              />

              <Box sx={{ ml: -2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <DatetimePicker
                        onChange={(date) =>
                          handleChange({
                            target: { name: "start", value: new Date(date) },
                          })
                        }
                        value={formData.start}
                        required
                        label="Event Start Date"
                        disableClock={false}
                        format="dd/MM/yyyy hh:mm a"
                        showLeadingZeros
                        hourPlaceholder="hh"
                        calendarIcon={<span className="icon-calendar" />}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                      <DatetimePicker
                        onChange={(date) =>
                          handleChange({
                            target: { name: "end", value: new Date(date) },
                          })
                        }
                        value={formData.end}
                        required
                        label="Event End Date"
                        disableClock={false}
                        format="dd/MM/yyyy hh:mm a"
                        showLeadingZeros
                        hourPlaceholder="hh"
                        calendarIcon={<span className="icon-calendar" />}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              <FormControl
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FormLabel id="">Food:</FormLabel>
                <RadioGroup
                  row
                  aria-label="food"
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  style={{ marginLeft: "15px" }}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Book Now"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EventForm;
