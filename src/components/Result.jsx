import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RiskGauge from "./RiskGauge";
import ScoresBarChart from "./ScoresBarChart";
import DonutChart from "./DonutChart";
import { FaUser } from "react-icons/fa";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import Lottie from "lottie-react";
import AiRobot from "../assets/AiRobot.json";

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-10 text-center">
        <h2>No results found. Please complete the survey first.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go to Survey
        </button>
      </div>
    );
  }

  const {
    prediction,
    suggestions,
    surveyScores,
    sleepDurationData,
    dietaryHabitsData,
    familyHistoryData,
  } = state;

  return (
    <div className="w-full min-h-screen bg-holi">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-black px-20 py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <img src={MentalHealthLogo} alt="logo" className="w-10 h-10" />
          <p className="text-2xl text-white font-bold">MindCare</p>
        </div>
        <div className="border-2 border-white rounded-full p-2 cursor-pointer">
          <FaUser size={22} color="white" />
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Left Section - Results */}
        <div className="flex-1 bg-white/30 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Your Results</h2>

          <RiskGauge probability={prediction.probability * 100} />
          <ScoresBarChart data={surveyScores} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
              title="Family History"
            />
          </div>

          <div className="mt-6 aligns-center px-2 pt-2 space-y-2 bg-blue-500 text-black rounded-lg flex justify-between text-center">
            <p>
              <strong>Label:</strong> {prediction.prediction}
            </p>
            <p>
              <strong>Risk Level:</strong> {prediction.risk_level}
            </p>
            <p>
              <strong>Probability:</strong>{" "}
              {(prediction.probability * 100).toFixed(2)}%
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/survey-form")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Take Survey Again
            </button>
          </div>
        </div>

        {/* Right Section - Suggestions (Chat Style) */}
        <div className="md:w-1/3 bg-white/30 shadow-lg rounded-2xl p-6 flex flex-col aligns-center">
          <h3 className="text-3xl font-bold mb-3 text-center text-blue-600">
            <Lottie
              animationData={AiRobot}
              loop={true}
              className="w-64 h-64 mx-auto"
            />
            <p>Suggestion by Sara</p>
          </h3>
          <div className="space-y-4">
            {suggestions.map((sugg, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-2xl p-4 text-gray-700 leading-relaxed border border-gray-100"
              >
                <p className="text-sm whitespace-pre-line">{sugg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
