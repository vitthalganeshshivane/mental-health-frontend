import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Button,
  Stack,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import RiskGauge from "./RiskGauge";
import ScoresBarChart from "./ScoresBarChart";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import ResultStats from "./ResultStats";

function SurveyDetailsDialog({ open, onClose, survey, user }) {
  const printRef = useRef();

  const prediction = survey?.prediction || {};
  const surveyData = survey?.survey || {};

  const surveyScores = [
    { name: "Academic Pressure", value: surveyData.academic_pressure || 0 },
    { name: "Work Pressure", value: surveyData.work_pressure || 0 },
    { name: "CGPA", value: surveyData.cgpa || 0 },
    { name: "Study Satisfaction", value: surveyData.study_satisfaction || 0 },
    { name: "Job Satisfaction", value: surveyData.job_satisfaction || 0 },
    { name: "Financial Stress", value: surveyData.financial_stress || 0 },
  ];

  const transformedScores = surveyScores.map(({ name, value }) => ({
    name,
    score: value,
  }));

  const sleepDurationData = [{ name: surveyData.sleep_duration || "N/A" }];
  const dietaryHabitsData = [{ name: surveyData.dietary_habits || "N/A" }];
  const familyHistoryData = [{ name: surveyData.family_history || "N/A" }];

  const suggestions = survey?.suggestions || [];

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      {/* Dialog Title */}
      <DialogTitle sx={{ fontWeight: "bold" }}>Survey Details</DialogTitle>

      <DialogContent dividers>
        {survey ? (
          <Box ref={printRef} sx={{ pb: 2 }}>
            <Stack spacing={3}>
              {/* Brand Header like Invoice */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  pb: 2,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img
                  src={MentalHealthLogo} // Replace with your logo path
                  alt="MindCare Logo"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    padding: 4,
                    backgroundColor: "#fff",
                  }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#1976d2">
                    MindCare
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Healthy Minds, Happy Lives — Your Mental Health Assistant
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    Contact: support@mindcare.app | +1 234 567 890
                  </Typography>
                </Box>
              </Box>

              {/* User Info */}
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  User Information
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Name: {user?.user?.name || "-"}
                </Typography>
                <Typography variant="body1" sx={{ ml: 2, mb: 2 }}>
                  Email: {user?.user?.email || "-"}
                </Typography>
              </Box>

              <Divider />

              {/* Risk Probability Gauge */}
              {prediction.probability !== undefined && (
                <>
                  <Typography variant="subtitle1" fontWeight={600} mb={1}>
                    Risk Probability:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <RiskGauge probability={prediction.probability * 100} />
                  </Box>
                </>
              )}

              {/* Survey Scores Bar Chart */}
              <Typography variant="subtitle1" fontWeight={600}>
                Survey Scores:
              </Typography>
              <Box sx={{ height: 300, width: "100%" }}>
                <ScoresBarChart data={transformedScores} />
              </Box>

              {/* Additional Stats */}
              <Typography variant="subtitle1" fontWeight={600}>
                Additional Stats:
              </Typography>
              <ResultStats
                sleepDurationData={sleepDurationData}
                dietaryHabitsData={dietaryHabitsData}
                familyHistoryData={familyHistoryData}
              />

              <Divider />

              {/* Prediction Summary */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "#1976d2",
                  color: "white",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  mb: 2,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography>
                  <strong>Label:</strong> {prediction.label ?? "-"}
                </Typography>
                <Typography>
                  <strong>Risk Level:</strong> {prediction.risk_level ?? "-"}
                </Typography>
                <Typography>
                  <strong>Probability:</strong>{" "}
                  {prediction.probability !== undefined
                    ? `${(prediction.probability * 100).toFixed(2)}%`
                    : "-"}
                </Typography>
              </Box>

              {/* Detailed Survey Inputs in two columns */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Survey Inputs (Detailed):
              </Typography>
              <Box
                sx={{
                  bgcolor: "#e8f0fe",
                  borderRadius: 1,
                  p: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                }}
              >
                {Object.entries(surveyData).map(([key, val]) => (
                  <Box
                    key={key}
                    sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {key.split("_").join(" ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {String(val)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider />

              {/* Suggestions */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Suggestions:
              </Typography>
              <Stack spacing={2}>
                {suggestions.map((sugg, i) => (
                  <Card
                    key={i}
                    sx={{
                      bgcolor: "#e8f0fe",
                      boxShadow: 1,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 500,
                          fontStyle: "italic",
                          color: "#2c3e50",
                          lineHeight: 1.5,
                        }}
                      >
                        {sugg}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Box>
        ) : (
          <Typography color="error">Unable to load survey details.</Typography>
        )}

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SurveyDetailsDialog;
