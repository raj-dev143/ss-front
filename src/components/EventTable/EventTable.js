import React, { useState, useEffect } from "react";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";

import "moment/locale/en-gb";

moment.locale("en-gb");

const EventTable = ({ events, handleEdit, handleDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Perform actions after user authentication
    if (isAuthenticated) {
      // Here you can perform additional actions after user authentication
    }
  }, [isAuthenticated]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEvents = events
    .filter((event) =>
      Object.values(event).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .reverse();

  return (
    <Paper elevation={3} style={{ marginBottom: "20px" }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "10px", width: "200px" }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Booked For</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Booked By</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ground</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ball</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Food</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Charges</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Duration</Typography>
              </TableCell>
              {isAuthenticated &&
                (user.email === "rajendra.telemart@gmail.com" ||
                  user.email === "mayank@telemartone.com") && (
                  <TableCell>
                    <Typography variant="h6">Actions</Typography>
                  </TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.bookedBy}</TableCell>
                  <TableCell>{event.ground}</TableCell>
                  <TableCell>{event.ball}</TableCell>
                  <TableCell>{event.food}</TableCell>
                  <TableCell>₹{event.charges}/-</TableCell>
                  <TableCell>
                    <Typography>
                      {moment(event.start).format("MMMM D, YYYY, h:mm A")} -{" "}
                      {moment(event.end).format("MMMM D, YYYY, h:mm A")}
                    </Typography>
                  </TableCell>
                  {isAuthenticated &&
                    (user.email === "rajendra.telemart@gmail.com" ||
                      user.email === "mayank@telemartone.com") && (
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(event._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(event._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EventTable;
