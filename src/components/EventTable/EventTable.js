import React, { useState } from "react";
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

const EventTable = ({ events }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

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
    .reverse(); // Reverse the array to display the latest entry on top

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
                <Typography variant="h6">Charges</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Duration</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.bookedBy}</TableCell>
                  <TableCell>{event.ground}</TableCell>
                  <TableCell>{event.ball}</TableCell>
                  <TableCell>₹{event.charges}/-</TableCell>
                  <TableCell>
                    <Typography>
                      {moment(event.start).format("MMMM D, YYYY, h:mm A")} -{" "}
                      {moment(event.end).format("MMMM D, YYYY, h:mm A")}
                    </Typography>
                  </TableCell>
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
