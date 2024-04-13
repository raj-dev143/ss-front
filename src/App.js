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

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              SS Cricket
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isAuthenticated && (
                <div
                  style={{
                    marginRight: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar alt={user.name} src={user.picture} />
                  <span style={{ marginLeft: "5px" }}>
                    Welcome, {user.name}
                  </span>
                </div>
              )}
              {isAuthenticated ? (
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={loginWithRedirect}>
                  Log In
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {!isAuthenticated && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <img src="../ss-cricket.webp" alt="SS Cricket" />
          </div>
        )}
        {isAuthenticated && (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
