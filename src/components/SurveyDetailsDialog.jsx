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
} from "@mui/material";
import ScoresBarChart from "./ScoresBarChart";
import MentalHealthLogo from "../assets/mentalhealthlog.png";

function SurveyDetailsDialog({ open, onClose, survey, user }) {
  const printRef = useRef();

  if (!survey) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Survey Details</DialogTitle>
        <DialogContent dividers>
          <Typography color="error">Unable to load survey details.</Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }

  const {
    scores = {},
    userInputs = {},
    assessment = "",
    suggestions = [],
  } = survey;

  // Transform scores into chart data format
  const chartData = Object.entries(scores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }));

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
      <DialogTitle sx={{ fontWeight: "bold" }}>Survey Details</DialogTitle>
      <DialogContent dividers>
        <Box ref={printRef} sx={{ pb: 2 }}>
          {/* Header */}
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
              src={MentalHealthLogo}
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              User Information
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              Name: {user?.user?.name || "-"}
            </Typography>
            <Typography variant="body1" sx={{ ml: 2 }}>
              Email: {user?.user?.email || "-"}
            </Typography>
          </Box>

          <Divider />

          {/* Scores Chart */}
          <Typography variant="subtitle1" fontWeight={600} my={2}>
            Mental Health Scores:
          </Typography>
          <Box sx={{ height: 300, width: "100%" }}>
            <ScoresBarChart data={chartData} />
          </Box>

          {/* Assessment */}
          <Typography variant="subtitle1" fontWeight={600} mt={4} mb={1}>
            Assessment Summary:
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ whiteSpace: "pre-line", fontStyle: "italic" }}
          >
            {assessment.replace(/^\*\*|\*\*$/g, "").trim()}
          </Typography>

          {/* Detailed Survey Inputs */}
          <Typography variant="subtitle1" fontWeight={600} mt={4} mb={1}>
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
            {Object.entries(userInputs).map(([key, val]) => (
              <Box
                key={key}
                sx={{ borderBottom: 1, borderColor: "divider", pb: 0.5 }}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {key.split("_").join(" ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {String(val)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

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
                    {sugg.replace(/^\*\*/, "").replace(/\*\*$/, "")}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

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
