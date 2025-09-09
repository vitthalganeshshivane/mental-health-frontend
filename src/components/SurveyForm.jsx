import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import RiskGauge from "./RiskGauge";
import ScoresBarChart from "./ScoresBarChart";
import DonutChart from "./DonutChart";

const SurveyForm = () => {
  // Individual state variables
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [academicPressure, setAcademicPressure] = useState(1);
  const [workPressure, setWorkPressure] = useState(1);
  const [cgpa, setCgpa] = useState("");
  const [studySatisfaction, setStudySatisfaction] = useState(1);
  const [jobSatisfaction, setJobSatisfaction] = useState(1);
  const [sleepDuration, setSleepDuration] = useState("");
  const [dietaryHabits, setDietaryHabits] = useState("");
  const [workStudyHours, setWorkStudyHours] = useState("");
  const [financialStress, setFinancialStress] = useState(1);
  const [familyHistory, setFamilyHistory] = useState("");
  const [suicidalThoughts, setSuicidalThoughts] = useState("");

  // State to hold API results for display
  const [predictionResult, setPredictionResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userId = loginData?.user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const surveyData = {
      gender,
      age: Number(age),
      role,
      academic_pressure: Number(academicPressure),
      work_pressure: Number(workPressure),
      cgpa: Number(cgpa),
      study_satisfaction: Number(studySatisfaction),
      job_satisfaction: Number(jobSatisfaction),
      sleep_duration: sleepDuration,
      dietary_habits: dietaryHabits,
      work_study_hours: Number(workStudyHours),
      financial_stress: Number(financialStress),
      family_history: familyHistory,
      suicidal_thoughts: suicidalThoughts,
    };

    try {
      // Call prediction API
      const predictResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/predict`,
        surveyData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const prediction = predictResponse.data;
      setPredictionResult(prediction);

      // Call suggestions API
      const suggestionsResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/suggestions/generate`,
        {
          userInputs: surveyData,
          riskLevel: prediction.risk_level,
          probability: prediction.probability,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuggestions(suggestionsResponse.data.suggestions);

      // Call save surveys API to store survey, prediction and suggestions
      const savePayload = {
        userId,
        survey: surveyData,
        prediction: {
          label: prediction.prediction,
          probability: prediction.probability,
          risk_level: prediction.risk_level,
        },
        suggestions: suggestionsResponse.data.suggestions,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/save-surveys`,
        savePayload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Survey submitted, prediction, suggestions saved!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  const surveyScores = [
    { name: "Academic Pressure", score: Number(academicPressure) },
    { name: "Work Pressure", score: Number(workPressure) },
    { name: "Study Satisfaction", score: Number(studySatisfaction) },
    { name: "Job Satisfaction", score: Number(jobSatisfaction) },
    { name: "Financial Stress", score: Number(financialStress) },
  ];

  const sleepDurationData = [
    {
      name: "Less than 4 hours",
      value: sleepDuration === "Less than 4 hours" ? 1 : 0,
    },
    { name: "4-6 hours", value: sleepDuration === "4-6 hours" ? 1 : 0 },
    { name: "6-8 hours", value: sleepDuration === "6-8 hours" ? 1 : 0 },
    {
      name: "More than 8 hours",
      value: sleepDuration === "More than 8 hours" ? 1 : 0,
    },
  ];

  const dietaryHabitsData = [
    { name: "Low", value: dietaryHabits === "Low" ? 1 : 0 },
    { name: "Moderate", value: dietaryHabits === "Moderate" ? 1 : 0 },
    { name: "High", value: dietaryHabits === "High" ? 1 : 0 },
  ];

  const familyHistoryData = [
    { name: "Yes", value: familyHistory === "Yes" ? 1 : 0 },
    { name: "No", value: familyHistory === "No" ? 1 : 0 },
  ];

  console.log(predictionResult);

  return (
    <div style={styles.container}>
      <h2>Mental Health Survey</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label style={styles.label}>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
            required
            style={styles.input}
            placeholder="Age"
          />
        </label>

        <label style={styles.label}>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Student, Employee"
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Academic Pressure (1-5):
          <input
            type="number"
            value={academicPressure}
            onChange={(e) => setAcademicPressure(e.target.value)}
            min={1}
            max={5}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Work Pressure (1-5):
          <input
            type="number"
            value={workPressure}
            onChange={(e) => setWorkPressure(e.target.value)}
            min={1}
            max={5}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          CGPA:
          <input
            type="number"
            step="0.01"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            min={0}
            max={10}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Study Satisfaction (1-5):
          <input
            type="number"
            value={studySatisfaction}
            onChange={(e) => setStudySatisfaction(e.target.value)}
            min={1}
            max={5}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Job Satisfaction (1-5):
          <input
            type="number"
            value={jobSatisfaction}
            onChange={(e) => setJobSatisfaction(e.target.value)}
            min={1}
            max={5}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Sleep Duration:
          <select
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>
              Select option
            </option>
            <option>Less than 4 hours</option>
            <option>4-6 hours</option>
            <option>6-8 hours</option>
            <option>More than 8 hours</option>
          </select>
        </label>

        <label style={styles.label}>
          Dietary Habits:
          <select
            value={dietaryHabits}
            onChange={(e) => setDietaryHabits(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>
              Select option
            </option>
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </label>

        <label style={styles.label}>
          Work/Study Hours (per day):
          <input
            type="number"
            value={workStudyHours}
            onChange={(e) => setWorkStudyHours(e.target.value)}
            min={0}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Financial Stress (1-5):
          <input
            type="number"
            value={financialStress}
            onChange={(e) => setFinancialStress(e.target.value)}
            min={1}
            max={5}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Family History of Mental Illness:
          <select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>
              Select option
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label style={styles.label}>
          Have you ever had suicidal thoughts?
          <select
            value={suicidalThoughts}
            onChange={(e) => setSuicidalThoughts(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>
              Select option
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <button type="submit" style={styles.button}>
          View Result
        </button>
      </form>

      {/* Show prediction result */}
      {predictionResult && (
        <div style={styles.resultBox}>
          <h3>Prediction Result</h3>
          <div>
            {predictionResult && (
              <RiskGauge probability={predictionResult.probability * 100} />
            )}
          </div>
          <div>
            <ScoresBarChart data={surveyScores} />
          </div>
          <div>
            <DonutChart
              data={sleepDurationData}
              dataKey="value"
              nameKey="name"
              title="Sleep Duration"
            />

            <DonutChart
              data={dietaryHabitsData}
              dataKey="value"
              nameKey="name"
              title="Dietary Habits"
            />

            <DonutChart
              data={familyHistoryData}
              dataKey="value"
              nameKey="name"
              title="Family History of Mental Illness"
            />
          </div>
          <p>
            <strong>Label:</strong> {predictionResult.prediction}
          </p>
          <p>
            <strong>Risk Level:</strong> {predictionResult.risk_level}
          </p>
          <p>
            <strong>Probability:</strong>{" "}
            {(predictionResult.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}

      {/* Show suggestions */}
      {suggestions.length > 0 && (
        <div style={styles.resultBox}>
          <h3>Suggestions</h3>
          <ul>
            {suggestions.map((sugg, idx) => (
              <li key={idx}>{sugg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 900,
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
  },
  input: {
    padding: 8,
    fontSize: 16,
    marginTop: 5,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  select: {
    padding: 8,
    fontSize: 16,
    marginTop: 5,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: 30,
    padding: 20,
    border: "1px solid #1976d2",
    borderRadius: 6,
  },
};

export default SurveyForm;
