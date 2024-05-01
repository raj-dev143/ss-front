import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, loginWithRedirect, isAuthenticated, isLoading, logout } =
    useAuth0();

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="primary" />
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <div className="loginBg">
        <div className="loginCenter">
          <div className="loginRight">
            <div className="loginBtn">
              <Button color="inherit" onClick={loginWithRedirect}>
                <img src="../login.svg" alt="Login" title="Login" />
              </Button>
            </div>
            <div className="ssLogo">
              <img
                src="../ss-cricket.svg"
                alt="SS Cricket"
                title="SS Criccket Commune"
              />
            </div>
            <div className="playerPic">
              <img src="../player.webp" alt="Player" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if the user's email is authorized
  if (
    user &&
    !["rajendra.telemart@gmail.com", "rajendra.frontend@gmail.com", "mayank@telemartone.com"].includes(
      user.email
    )
  ) {
    // If not authorized, log the user out and display a message
    logout();
    return (
      <p>
        Access denied. You are not authorized to access this application with
        the email: {user.email}.
      </p>
    );
  }

  return (
    <Router>
      <div>
        <AppBar position="static" className="header">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              SS Cricket
            </Typography>
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account Settings">
                  <IconButton size="small" sx={{ ml: 2 }}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={user.name}
                      src={user.picture}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
