import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const EventForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  open,
}) => {
  const today = new Date().toISOString().slice(0, 16);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
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
                required
                fullWidth // Set input field to take 100% width
              />
              <TextField
                type="text"
                name="bookedBy"
                value={formData.bookedBy}
                onChange={handleChange}
                label="Booked By"
                required
                fullWidth // Set input field to take 100% width
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
                      fullWidth // Set input field to take 100% width
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
                      fullWidth // Set input field to take 100% width
                    >
                      <MenuItem value="Leather">Leather</MenuItem>
                      <MenuItem value="Tennis">Tennis</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ ml: -2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      name="start"
                      value={formData.start}
                      onChange={handleChange}
                      label="Event Start Date"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: today,
                      }}
                      fullWidth // Set input field to take 100% width
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      label="Event End Date"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: today,
                      }}
                      fullWidth // Set input field to take 100% width
                    />
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
                fullWidth // Set input field to take 100% width
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
