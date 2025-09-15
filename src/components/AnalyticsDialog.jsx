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

  // Update statsList to match new aggregate field names
  const statsList = [
    { label: "Average Stress", value: data.stats?.avg_stress },
    { label: "Average Anxiety", value: data.stats?.avg_anxiety },
    { label: "Average Sleep Quality", value: data.stats?.avg_sleepQuality },
    {
      label: "Average Emotional Wellbeing",
      value: data.stats?.avg_emotionalWellBeing,
    },
    { label: "Average Age", value: data.stats?.avg_age },
    // add more if needed
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
