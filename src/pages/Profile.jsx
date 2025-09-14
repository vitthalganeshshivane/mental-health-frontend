import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
} from "@mui/material";
import axios from "axios";
import SurveyDetailsDialog from "../components/SurveyDetailsDialog";

function Profile() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  console.log(user);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(`${baseURL}/api/save-surveys/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(Array.isArray(resp.data) ? resp.data : []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [baseURL]);

  const handleOpenSurvey = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `${baseURL}/api/save-surveys/history/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedSurvey(resp.data);
      setOpenDialog(true);
    } catch {
      setSelectedSurvey(null);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSurvey(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Profile
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Info
        </Typography>
        <Typography>
          Name: <b>{user?.user?.name || "-"}</b>
        </Typography>
        <Typography>
          Email: <b>{user?.user?.email || "-"}</b>
        </Typography>
        <Typography>
          Age: <b>{user?.user?.age || "-"}</b>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Survey History
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        ) : history.length === 0 ? (
          <Typography color="textSecondary">No history found.</Typography>
        ) : (
          <List>
            {history.map((item) => (
              <ListItem
                key={item._id}
                secondaryAction={
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenSurvey(item._id)}
                  >
                    See History
                  </Button>
                }
              >
                <ListItemText
                  primary={`${item.createdAt?.slice(0, 10)} | Risk: ${
                    item.prediction?.risk_level || "-"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <SurveyDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        survey={selectedSurvey}
        user={user}
      />

      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Survey Details</DialogTitle>
        <DialogContent dividers>
          {selectedSurvey ? (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Taken on: {selectedSurvey.createdAt?.slice(0, 10) || "-"}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Risk Level: {selectedSurvey.prediction?.risk_level || "-"} (
                {((selectedSurvey.prediction?.probability ?? 0) * 100).toFixed(
                  1
                )}
                %)
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Survey Inputs:
              </Typography>
              <List dense>
                {Object.entries(selectedSurvey.survey || {}).map(
                  ([key, val]) => (
                    <ListItem key={key}>
                      <ListItemText primary={`${key}: ${val}`} />
                    </ListItem>
                  )
                )}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Suggestions:
              </Typography>
              <List dense>
                {(selectedSurvey.suggestions || []).map((s, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={s} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography color="error">
              Unable to load survey details.
            </Typography>
          )}
        </DialogContent>
      </Dialog> */}
    </Container>
  );
}

export default Profile;
