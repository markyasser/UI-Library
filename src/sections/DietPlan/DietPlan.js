import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Stack } from "@mui/material";
import FeedBack from "./FeedBack";
const columns = [
  {
    field: "day",
    headerName: "Day",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "breakfast",
    headerName: "Breakfast",
    width: 300,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Stack spacing={1} alignItems="center" sx={{ my: 1 }}>
        {params.value.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              borderBottom:
                index < params.value.length - 1 ? "1px solid #ccc" : "none",
              pb: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    ),
  },
  {
    field: "lunch",
    headerName: "Lunch",
    width: 350,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Stack spacing={1} alignItems="center" sx={{ my: 1 }}>
        {params.value.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              borderBottom:
                index < params.value.length - 1 ? "1px solid #ccc" : "none",
              pb: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    ),
  },
  {
    field: "dinner",
    headerName: "Dinner",
    width: 350,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Stack spacing={1} alignItems="center" sx={{ my: 1 }}>
        {params.value.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              borderBottom:
                index < params.value.length - 1 ? "1px solid #ccc" : "none",
              pb: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    ),
  },
];
const DietPlan = ({ dietPlan }) => {
  const bmr = dietPlan.bmr.toFixed(1);
  const dailyCalories = dietPlan.dailyCalories.toFixed(1);
  const bmi = dietPlan.bmi.toFixed(1);
  const rows = dietPlan.weeklyPlan.map((day, idx) => ({
    id: idx,
    day: day.day,
    breakfast: day.breakfast.map((item) => `${item.quantity} ${item.name}`),
    lunch: day.lunch.map((item) => `${item.quantity} ${item.name}`),
    dinner: day.dinner.map((item) => `${item.quantity} ${item.name}`),
  }));

  return (
    <Container sx={{ my: 8 }}>
      <Typography component="h1" variant="h4" fontWeight={700}>
        Your Weekly Diet Plan
      </Typography>
      <FeedBack />
      <Typography variant="h6" gutterBottom>
        BMR (Basal Metabolic Rate): {bmr} kcal
      </Typography>
      <Typography variant="h6" gutterBottom>
        Daily Needed Calories: {dailyCalories} kcal per day
      </Typography>
      <Typography variant="h6" gutterBottom>
        Body Mass Index: {bmi} kg/m2 (Ideal between 18.5 and 24.9 kg/m2)
      </Typography>
      <DataGrid
        rowSelection={false}
        autoHeight
        rows={rows}
        columns={columns}
        rowHeight={200} // Adjust this value to ensure all items are visible
        sx={{
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </Container>
  );
};

export default DietPlan;
