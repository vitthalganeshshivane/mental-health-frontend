import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";

function AnalyticsDialog({ open, onClose, data }) {
  if (!data) return null;

  // Extract all averages from aggregate stats
  const statsList = [
    {
      label: "Average Academic Pressure",
      value: data.stats?.avg_academic_pressure,
    },
    { label: "Average Work Pressure", value: data.stats?.avg_work_pressure },
    { label: "Average CGPA", value: data.stats?.avg_cgpa },
    {
      label: "Average Study Satisfaction",
      value: data.stats?.avg_study_satisfaction,
    },
    {
      label: "Average Job Satisfaction",
      value: data.stats?.avg_job_satisfaction,
    },
    {
      label: "Average Financial Stress",
      value: data.stats?.avg_financial_stress,
    },
    { label: "Average Age", value: data.stats?.avg_age },
    {
      label: "Average Work/Study Hours",
      value: data.stats?.avg_work_study_hours,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Research & Analytics</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h5" fontWeight="bold" color="#1976d2" gutterBottom>
          Platform Summary
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Total Users:{" "}
            <span style={{ color: "#0088FE" }}>{data.userCount}</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Total Surveys:{" "}
            <span style={{ color: "#00C49F" }}>{data.surveyCount}</span>
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "#f1f7fe", borderRadius: 2, py: 2, px: 3 }}>
          {statsList.map(
            (item) =>
              typeof item.value === "number" && (
                <Typography
                  key={item.label}
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    mb: 1,
                    fontSize: "1.05rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                    {item.value.toFixed(2)}
                  </span>
                </Typography>
              )
          )}
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default AnalyticsDialog;
