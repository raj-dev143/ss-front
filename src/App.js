import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [authorizedEmails, setAuthorizedEmails] = useState([
    "rajendra.telemart@gmail.com",
    "mayank@telemartone.com",
  ]);

  useEffect(() => {
    async function fetchAuthorizedEmails() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users`
        );
        if (response.ok) {
          const data = await response.json();
          const emails = data.map((event) => event.email);
          setAuthorizedEmails([...authorizedEmails, ...emails]);
        } else {
          // Handle error response
          console.error(
            "Failed to fetch authorized emails:",
            response.statusText
          );
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error fetching authorized emails:", error);
      }
    }

    fetchAuthorizedEmails();
  }, [authorizedEmails]);

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

  if (user && !authorizedEmails.includes(user.email)) {
    logout();
    return (
      <p style={{textAlign:"center"}}>
        Access denied. You are not authorized to access this application with
        the email: <strong style={{color:"red"}}><em>{user.email}</em></strong>.
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
                    {isAuthenticated &&
                      (user.email === "rajendra.telemart@gmail.com" ||
                        user.email === "mayank@telemartone.com") && (
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
          {isAuthenticated &&
            (user.email === "rajendra.telemart@gmail.com" ||
              user.email === "mayank@telemartone.com") && (
              <Route path="/members" element={<Members />} />
            )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
