import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Box,
} from "@mui/material";

function SurveyDetailsDialog({ open, onClose, survey, user }) {
  const printRef = useRef();

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Restore React app
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Survey Details</DialogTitle>
      <DialogContent dividers>
        {survey ? (
          <Box ref={printRef} sx={{ pb: 2 }}>
            <Stack spacing={2}>
              {/* User Info */}
              <Typography variant="h6" fontWeight={700}>
                User Information
              </Typography>
              <Typography variant="body1" sx={{ ml: 2 }}>
                Name: {user?.user?.name || "-"}
              </Typography>
              <Typography variant="body1" sx={{ ml: 2, mb: 2 }}>
                Email: {user?.user?.email || "-"}
              </Typography>

              <Divider />

              {/* Survey Taken Date */}
              <Typography variant="subtitle1" fontWeight={600}>
                Taken on:
              </Typography>
              <Typography variant="body1" sx={{ ml: 2 }}>
                {survey.createdAt?.slice(0, 10) || "-"}
              </Typography>

              <Divider />

              {/* Risk Level */}
              <Typography variant="subtitle1" fontWeight={600}>
                Risk Level:
              </Typography>
              <Typography variant="body1" sx={{ ml: 2 }}>
                {survey.prediction?.risk_level || "-"} (
                {((survey.prediction?.probability ?? 0) * 100).toFixed(1)}%)
              </Typography>

              <Divider />

              {/* Survey Inputs */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Survey Inputs:
              </Typography>
              <Box
                sx={{
                  bgcolor: "#e8f0fe",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <List dense>
                  {Object.entries(survey.survey || {}).map(([key, val]) => (
                    <ListItem key={key} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={key.split("_").join(" ")}
                        secondary={String(val)}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                        secondaryTypographyProps={{ color: "text.secondary" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider />

              {/* Suggestions */}
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Suggestions:
              </Typography>
              <Box
                sx={{
                  bgcolor: "#e8f0fe",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <List dense>
                  {(survey.suggestions || []).map((sugg, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={sugg}
                        primaryTypographyProps={{
                          fontSize: "1rem", // bigger font
                          fontWeight: 500, // medium weight
                          fontStyle: "italic", // italic text
                          color: "#2c3e50", // dark blue-gray color
                          lineHeight: 1.5,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Typography color="error">Unable to load survey details.</Typography>
        )}

        {/* Buttons */}
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
