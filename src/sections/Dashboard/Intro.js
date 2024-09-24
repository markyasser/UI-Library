import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import backgroundImage from "../../assets/background.jpg";

const Intro = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate("/create-diet-plan"); // Navigate to the desired route
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the start (left)
        justifyContent: "center",
        color: "white",
        textAlign: "left", // Align text to the left
        px: 4, // Add horizontal padding
        py: 2, // Add vertical padding
        mb: 4, // Margin bottom for spacing
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Smart Nutrition
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Key for Healthy Life
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2, // Margin top for spacing
          fontSize: "1.25rem", // Increase font size
          padding: "10px 20px", // Increase padding
          minWidth: "200px", // Set minimum width
        }}
        onClick={handleClick}
      >
        Create Your Diet Plan
      </Button>
    </Box>
  );
};

export default Intro;
