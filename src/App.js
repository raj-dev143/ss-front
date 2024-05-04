import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Members from "./pages/Members";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, loginWithRedirect, isAuthenticated, isLoading, logout } =
    useAuth0();
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [authorizedEmails, setAuthorizedEmails] = useState([]);
  const [showBackToHome, setShowBackToHome] = useState(false);

  useEffect(() => {
    const fetchAuthorizedEmails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users`
        );
        if (response.ok) {
          const users = await response.json();
          const emails = users.map((user) => user.email);
          // Add the default email
          emails.push("mayank@telemartone.com");
          emails.push("rajendra.telemart@gmail.com");
          setAuthorizedEmails(emails);
        } else {
          console.error("Failed to fetch authorized emails");
        }
      } catch (error) {
        console.error("Error fetching authorized emails:", error);
      }
    };

    fetchAuthorizedEmails();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user && !authorizedEmails.includes(user.email)) {
      setShowBackToHome(true);
    } else {
      setShowBackToHome(false);
    }
  }, [isAuthenticated, user, authorizedEmails]);

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
                title="SS Cricket Commune"
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

  if (!authorizedEmails.includes(user.email)) {
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          Access denied. You are not authorized to access this application with
          the email:{" "}
          <strong style={{ color: "red" }}>
            <em>{user.email}</em>
          </strong>
          .
        </p>
        {showBackToHome && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button onClick={logout}>Back to Home</Button>
          </div>
        )}
      </div>
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
                  <IconButton
                    size="small"
                    onClick={(event) => {
                      setOpenMenu(true);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={user.name}
                      src={user.picture}
                    />
                  </IconButton>
                </Tooltip>
                {openMenu && (
                  <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={() => setOpenMenu(false)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {user.email === "rajendra.telemart@gmail.com" && (
                      <MenuItem
                        onClick={() => setOpenMenu(false)}
                        component={Link}
                        to="/members"
                      >
                        Members
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        setOpenMenu(false);
                        logout();
                      }}
                    >
                      Log Out
                    </MenuItem>
                  </Menu>
                )}
              </Box>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          {user.email === "rajendra.telemart@gmail.com" && (
            <Route path="/members" element={<Members />} />
          )}
          {/* Redirect to home if not authorized */}
          <Route path="/members" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
