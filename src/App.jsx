import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import HomeRedirector from "./components/HomeRedirector";
import SurveyForm from "./components/SurveyForm";
import Profile from "./pages/Profile";
// import Result from "./components/Result";
import ResultPage from "./components/Result";


function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomeRedirector />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/survey-form"
          element={
            <PrivateRoute>
              <SurveyForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
          />
          <Route
          path="/results"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
