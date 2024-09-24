import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "navy",
        color: "white",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Mark Yasser
      </Typography>
      <Stack direction="row" spacing={3}>
        <Typography variant="body2">
          <Link
            href="https://github.com/markyasser"
            target="_blank"
            rel="noopener"
            sx={{ color: "white", textDecoration: "none" }}
          >
            GitHub Repository
          </Link>
        </Typography>
        <Typography variant="body2">Mobile: +20 120 25698 4272</Typography>
        <Typography variant="body2">
          Email:{" "}
          <Link
            href="mailto:markyasser2011@gmail.com"
            sx={{ color: "white", textDecoration: "none" }}
          >
            markyasser2011@gmail.com
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
