import React from "react";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

const Feedback = ({ value, totalFeedbacks }) => (
  <Box>
    <Typography variant="h3">Rating</Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > legend": { mt: 2 },
      }}
      mb={2}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Rating name="read-only-feedback" value={value} readOnly size="large" />
      </Box>
      <Typography variant="h6">by {totalFeedbacks} users</Typography>
    </Box>
  </Box>
);

export default Feedback;
