import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { purple } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Members = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to manage delete confirmation dialog
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of the member to be deleted

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users`
      );
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditIndex(null);
    setName("");
    setEmail("");
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    if (!newName.trim()) {
      setNameError("Please enter a name");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (!newEmail.trim()) {
      setEmailError("Please enter an email");
    } else if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setNameError("Please enter a name");
      return;
    }

    if (!email.trim()) {
      setEmailError("Please enter an email");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    try {
      if (editIndex !== null) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/users/${members[editIndex]._id}`,
          { name, email }
        );
        toast.success("User updated successfully");
      } else {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users`, {
          name,
          email,
        });
        toast.success("User added successfully");
      }

      closeDialog();
      fetchData();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit user data");
    }
  };

  const handleEdit = (index) => {
    const { name, email } = members[index];
    setName(name);
    setEmail(email);
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleDelete = async (index) => {
    setDeleteIndex(index); // Set the index of the member to be deleted
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/users/${members[deleteIndex]._id}`
      );
      toast.success("User deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete user");
    } finally {
      setDeleteDialogOpen(false); // Close the delete confirmation dialog
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search) ||
      member.email.toLowerCase().includes(search)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 16px",
        }}
      >
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" onClick={openDialog}>
          Add User
        </Button>
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {editIndex !== null ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            {editIndex !== null ? "Save" : "Submit"}
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(index)}
                      style={{ color: purple[500] }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      style={{ color: purple[500] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMembers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <ToastContainer /> {/* ToastContainer for displaying messages */}
    </div>
  );
};

export default Members;
