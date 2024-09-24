import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { postFeedback } from "../../services/apiService";

const FeedbackDialog = ({ open, handleClose, message, onSuccess }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thank you for your FeedBack</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "#3f51b5", color: "#fff" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function FeedBack() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [feedbackValue, setFeedbackValue] = useState(5); // Default value is 5

  const handleSubmit = async () => {
    try {
      const res = await postFeedback({ feedback: feedbackValue });
      if (res.data["status"] === "success") {
        setDialogMessage(
          `Feedback submitted with a rating of ${feedbackValue}`
        );
      } else {
        setDialogMessage(`Failed to submit feedback. Please try again.`);
      }
    } catch (error) {
      setDialogMessage(`Server error. Please try again.`);
    }
    setDialogOpen(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically if needed
        "& > legend": { mt: 2 },
      }}
      mb={2}
    >
      <Typography component="legend">Feedback</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center Rating component horizontally
          width: "100%", // Ensure it uses full width to align properly
        }}
      >
        <Rating
          name="feedback"
          value={feedbackValue}
          onChange={(event, newValue) => {
            setFeedbackValue(newValue);
          }}
          size="large"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit Feedback
      </Button>
      <FeedbackDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        message={dialogMessage}
      />
    </Box>
  );
}
