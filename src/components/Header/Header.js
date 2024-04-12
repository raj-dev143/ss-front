import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          SS Cricket
        </Typography>
        <div>
          <Button
            component={Link}
            to="/"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            Home
          </Button>
          <Button component={Link} to="/" color="inherit">
            Log Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
