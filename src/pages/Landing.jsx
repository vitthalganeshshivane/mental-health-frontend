import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>MindCare - Mental Health Detection</h1>
      <p>
        Your wellbeing matters. Take the survey and get personalized support.
      </p>
      <Link to="/login" style={{ margin: 10 }}>
        Login
      </Link>{" "}
      |{" "}
      <Link to="/signup" style={{ margin: 10 }}>
        Sign Up
      </Link>
    </div>
  );
};

export default Landing;
