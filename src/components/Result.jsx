import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoresBarChart from "./ScoresBarChart";
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

  const { scores, assessment, suggestions } = state;

  // Transform scores for bar chart format
  const chartData = Object.entries(scores).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }));

  return (
    <div className="w-full min-h-screen bg-holi p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-black px-8 py-4 shadow-lg rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <img src={MentalHealthLogo} alt="logo" className="w-10 h-10" />
          <p className="text-2xl text-white font-bold">MindCare</p>
        </div>
        <div
          className="border-2 border-white rounded-full p-2 cursor-pointer"
          onClick={() => {
            navigate("/user-profile");
          }}
        >
          <FaUser size={22} color="white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Section: Scores Chart */}
        <section className="bg-white/90 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Your Mental Health Scores
          </h2>
          <ScoresBarChart data={chartData} />
        </section>

        {/* Section: Assessment Text */}
        <section className="bg-white/90 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Assessment Summary
          </h2>
          <div className="prose max-w-none text-gray-800 whitespace-pre-line text-justify px-4">
            {assessment.replace(/^\*\*|\*\*$/g, "").trim()}
          </div>
        </section>

        {/* Section: Suggestions */}
        <section className="bg-white/90 rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center flex flex-col items-center">
            <Lottie
              animationData={AiRobot}
              loop={true}
              className="w-24 h-24 mb-2"
            />
            Helpful Suggestions
          </h2>
          <div className="space-y-4">
            {suggestions.map((sugg, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-300 rounded-2xl p-4 text-gray-900 leading-relaxed shadow-sm"
              >
                <p className="text-md">
                  {sugg.replace(/^\*\*/, "").replace(/\*\*$/, "")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/survey-form")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            Take Survey Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
