import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 1200 }}>
      <Container>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center", // Align items vertically center
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="logo"
                sx={{ height: 40, marginRight: 2 }}
              />
              Smart Nutrition
            </Typography>
          </Box>
          <Button color="inherit" component={Link} to="/create-diet-plan">
            Create Diet Plan
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
