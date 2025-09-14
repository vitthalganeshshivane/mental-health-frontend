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
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import axios from "axios";
import SurveyDetailsDialog from "../components/SurveyDetailsDialog";
import AnalyticsDialog from "../components/AnalyticsDialog";
import { FaUser } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if (stored) setUser(JSON.parse(stored));
  }, []);

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

  const handleOpenAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(`${baseURL}/api/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalyticsData(resp.data);
      setAnalyticsOpen(true);
    } catch (error) {
      alert("Failed to fetch analytics data", error);
    }
  };

  const handleCloseAnalytics = () => {
    setAnalyticsOpen(false);
    setAnalyticsData(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    navigate("/login");
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        px: 6,
        py: 4,
        minHeight: "100vh",
        bgcolor: "#121212",
        color: "rgba(255,255,255,0.87)",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#1e1e1e",
          px: 7,
          py: 3,
          borderRadius: 2,
          mb: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <img
            src={MentalHealthLogo}
            alt="logo"
            style={{ width: "40px", height: "40px" }}
          />
          <Typography variant="h5" fontWeight="bold" color="#90caf9">
            MindCare
          </Typography>
        </Box>

        <Box
          sx={{
            border: "2px solid #90caf9",
            borderRadius: "50%",
            p: 1,
            cursor: "pointer",
            "&:hover": { bgcolor: "rgba(144,202,249,0.1)" },
          }}
          onClick={() => navigate("/user-profile")}
        >
          <FaUser size={22} color="#90caf9" />
        </Box>
      </Box>

      {/* Main Heading */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#64b5f6" }}
      >
        Profile
      </Typography>

      {/* User Info Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "#1e1e1e",
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="#bbdefb">
          User Info
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Name: <b>{user?.user?.name || "-"}</b>
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Email: <b>{user?.user?.email || "-"}</b>
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Age: <b>{user?.user?.age || "-"}</b>
        </Typography>
      </Paper>

      {/* Survey History Section */}
      <Paper
        sx={{
          p: 3,
          bgcolor: "#1e1e1e",
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="#bbdefb">
          Survey History
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : history.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2 }}>
            No history found.
          </Typography>
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
                    sx={{
                      textTransform: "none",
                      color: "#90caf9",
                      borderColor: "#90caf9",
                      "&:hover": { borderColor: "#64b5f6", color: "#64b5f6" },
                    }}
                  >
                    See History
                  </Button>
                }
                disableGutters
                sx={{ color: "rgba(255,255,255,0.9)" }}
              >
                <ListItemText
                  primary={`${item.createdAt?.slice(0, 10) || "-"} | Risk: ${
                    item.prediction?.risk_level || "-"
                  }`}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenAnalytics}
          sx={{
            textTransform: "none",
            borderColor: "#90caf9",
            color: "#90caf9",
            "&:hover": { borderColor: "#64b5f6", color: "#64b5f6" },
          }}
        >
          Research and Analytics
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            borderColor: "#f44336",
            color: "#f44336",
            "&:hover": { borderColor: "#e57373", color: "#e57373" },
          }}
        >
          Logout
        </Button>
      </Stack>

      {/* Survey Details Dialog */}
      <SurveyDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        survey={selectedSurvey}
        user={user}
      />

      {/* Analytics Dialog */}
      <AnalyticsDialog
        open={analyticsOpen}
        onClose={handleCloseAnalytics}
        data={analyticsData}
      />
    </Container>
  );
}

export default Profile;
