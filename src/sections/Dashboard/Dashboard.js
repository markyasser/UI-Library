import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { getStatistics } from "../../services/apiService";
import Feedback from "./Feedback";
import Statistics from "./Statistics";
import Intro from "./Intro";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [rating, setRating] = useState({});
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStatistics();
        console.log("Statistics response:", response.data);
        setStatistics(response.data.statistics);
        setRating(response.data.rating);
        setValue(response.data.rating.averageRating);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setError("Failed to fetch statistics data.");
      }
    };

    fetchData();
  }, []);

  return error ? (
    <p style={{ color: "red" }}>{error}</p>
  ) : (
    <Container>
      <Intro />
      <Feedback value={value} totalFeedbacks={rating.totalFeedbacks} />
      <Statistics statistics={statistics} />
    </Container>
  );
};

export default Dashboard;
