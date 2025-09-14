import React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

const StatCard = ({ title, value }) => (
  <Card sx={{ mb: 3, minWidth: 220, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Chip
        label={value || "N/A"}
        color="primary"
        sx={{ fontSize: "1.1rem", fontWeight: "bold", px: 2, py: 1 }}
      />
    </CardContent>
  </Card>
);

const ResultStats = ({
  sleepDurationData,
  dietaryHabitsData,
  familyHistoryData,
}) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 6 }}
    >
      <StatCard title="Sleep Duration" value={sleepDurationData[0]?.name} />
      <StatCard title="Dietary Habits" value={dietaryHabitsData[0]?.name} />
      <StatCard title="Family History" value={familyHistoryData[0]?.name} />
    </Stack>
  );
};

export default ResultStats;
