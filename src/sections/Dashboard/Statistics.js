import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const Statistics = ({ statistics }) => {
  // Convert histograms to arrays of [label, value]
  const convertHistogram = (histogram) =>
    Object.entries(histogram).map(([key, value]) => [key, value]);

  return (
    <>
      <Typography variant="h3" sx={{ mb: 4, mt: 4 }}>
        Statistics
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box flex={1} display="flex" justifyContent="center">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: statistics.diabeticMales,
                    label: "Diabetic Males",
                  },
                  {
                    id: 1,
                    value: statistics.diabeticFemales,
                    label: "Diabetic Females",
                  },
                  {
                    id: 2,
                    value: statistics.nonDiabetic,
                    label: "Non Diabetic",
                  },
                ],
              },
            ]}
            width={600}
            height={300}
          />
        </Box>
        <Stack direction="column" spacing={2} flex={1}>
          {statistics.heightHistogram && (
            <BarChart
              width={500}
              height={300}
              series={[
                {
                  data: convertHistogram(statistics.heightHistogram).map(
                    (item) => item[1]
                  ),
                  label: "Heights",
                  id: "uvId",
                  stack: "total",
                  color: "#3f51b5",
                },
              ]}
              xAxis={[
                {
                  data: convertHistogram(statistics.heightHistogram).map(
                    (item) => item[0]
                  ),
                  scaleType: "band",
                },
              ]}
            />
          )}
          {statistics.weightHistogram && (
            <BarChart
              width={500}
              height={300}
              series={[
                {
                  data: convertHistogram(statistics.weightHistogram).map(
                    (item) => item[1]
                  ),
                  label: "Weights",
                  id: "uvId",
                  stack: "total",
                  color: "red",
                },
              ]}
              xAxis={[
                {
                  data: convertHistogram(statistics.weightHistogram).map(
                    (item) => item[0]
                  ),
                  scaleType: "band",
                },
              ]}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Statistics;
