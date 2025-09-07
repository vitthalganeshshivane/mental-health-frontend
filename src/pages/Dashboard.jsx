import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Your Dashboard</h1>
      <button style={styles.button} onClick={() => navigate("/survey-form")}>
        Take Survey
      </button>
      <button style={styles.button} onClick={() => navigate("/survey-history")}>
        View History
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    gap: "20px",
  },
  title: {
    marginBottom: 40,
    color: "#1976d2",
  },
  button: {
    padding: "15px 30px",
    fontSize: 18,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    width: 250,
  },
};

export default Dashboard;
