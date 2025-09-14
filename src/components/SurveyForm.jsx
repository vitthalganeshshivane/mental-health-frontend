import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import { FaUser } from "react-icons/fa";
import Lottie from "lottie-react";
import AiRobot from "../assets/AiRobot.json";

const questions = [
  {
    key: "gender",
    label: "What’s your gender?",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    key: "age",
    label: "How old are you?",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    key: "role",
    label: "What best describes you?",
    type: "text",
    placeholder: "e.g. Student, Employee",
  },
  {
    key: "academicPressure",
    label: "Academic Pressure",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    key: "workPressure",
    label: "Work Pressure",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    key: "cgpa",
    label: "Your CGPA",
    type: "number",
    placeholder: "Enter your CGPA (0-10)",
  },
  {
    key: "studySatisfaction",
    label: "Study Satisfaction",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    key: "jobSatisfaction",
    label: "Job Satisfaction",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    key: "sleepDuration",
    label: "How many hours do you usually sleep?",
    type: "select",
    options: [
      "Less than 4 hours",
      "4-6 hours",
      "6-8 hours",
      "More than 8 hours",
    ],
  },
  {
    key: "dietaryHabits",
    label: "How would you rate your dietary habits?",
    type: "select",
    options: ["Low", "Moderate", "High"],
  },
  {
    key: "workStudyHours",
    label: "Work/Study Hours per Day",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    key: "financialStress",
    label: "Financial Stress",
    type: "slider",
    min: 1,
    max: 5,
  },
  {
    key: "familyHistory",
    label: "Family History of Mental Illness?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    key: "suicidalThoughts",
    label: "Have you ever had suicidal thoughts?",
    type: "select",
    options: ["Yes", "No"],
  },
];

const SurveyForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData"));
  const userId = loginData?.user?.id;
  const currentQuestion = questions[step];

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = () => {
    if (!formData[currentQuestion.key]) {
      toast.error("Please answer this question before continuing");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const surveyData = {
      gender: formData.gender,
      age: Number(formData.age),
      role: formData.role,
      academic_pressure: Number(formData.academicPressure),
      work_pressure: Number(formData.workPressure),
      cgpa: Number(formData.cgpa),
      study_satisfaction: Number(formData.studySatisfaction),
      job_satisfaction: Number(formData.jobSatisfaction),
      sleep_duration: formData.sleepDuration,
      dietary_habits: formData.dietaryHabits,
      work_study_hours: Number(formData.workStudyHours),
      financial_stress: Number(formData.financialStress),
      family_history: formData.familyHistory,
      suicidal_thoughts: formData.suicidalThoughts,
    };

    try {
      const predictResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/predict`,
        surveyData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const prediction = predictResponse.data;

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

      const surveyScores = [
        { name: "Academic Pressure", value: surveyData.academic_pressure },
        { name: "Work Pressure", value: surveyData.work_pressure },
        { name: "CGPA", value: surveyData.cgpa },
        { name: "Study Satisfaction", value: surveyData.study_satisfaction },
        { name: "Job Satisfaction", value: surveyData.job_satisfaction },
        { name: "Financial Stress", value: surveyData.financial_stress },
      ];

      const sleepDurationData = [{ name: surveyData.sleep_duration, value: 1 }];
      const dietaryHabitsData = [{ name: surveyData.dietary_habits, value: 1 }];
      const familyHistoryData = [{ name: surveyData.family_history, value: 1 }];

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

      toast.success("Survey submitted successfully!");

      // 👉 Navigate to results page with data
      navigate("/results", {
        state: {
          prediction,
          suggestions: suggestionsResponse.data.suggestions,
          surveyScores,
          sleepDurationData,
          dietaryHabitsData,
          familyHistoryData,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between bg-black px-20 py-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={MentalHealthLogo} alt="logo" className="w-10 h-10" />
          <p className="text-2xl text-white font-bold">MindCare</p>
        </div>
        <div className="border-2 border-white rounded-full p-2 cursor-pointer">
          <FaUser size={22} color="white" />
        </div>
      </div>

      {/* Survey */}
      <div className="flex  justify-center min-h-screen bg-holi px-4 gap-2 ">
        <div className="mt-20">
          <Lottie animationData={AiRobot} loop={true} className="w-64 h-64" />{" "}
          <p className="text-center text-3xl font-bold text-blue-500 -mt-9 bg-gray-300/50 rounded-full ">
            Hii, here's Sara
          </p>
        </div>

        <div className="p-8 max-w-lg w-full h-auto mt-20">
          {/* Progress Bar */}
          <div className="w-full bg-gray-400 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold mb-4 text-center">
            {currentQuestion.label}
          </h2>

          {/* Inputs */}
          {currentQuestion.type === "select" && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    formData[currentQuestion.key] === opt
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleChange(currentQuestion.key, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "number" && (
            <input
              type="number"
              placeholder={currentQuestion.placeholder}
              value={formData[currentQuestion.key] || ""}
              onChange={(e) =>
                handleChange(currentQuestion.key, e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          )}

          {currentQuestion.type === "text" && (
            <input
              type="text"
              placeholder={currentQuestion.placeholder}
              value={formData[currentQuestion.key] || ""}
              onChange={(e) =>
                handleChange(currentQuestion.key, e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          )}

          {currentQuestion.type === "slider" && (
            <div className="flex flex-col items-center">
              <input
                type="range"
                min={currentQuestion.min}
                max={currentQuestion.max}
                value={formData[currentQuestion.key] || currentQuestion.min}
                onChange={(e) =>
                  handleChange(currentQuestion.key, e.target.value)
                }
                className="w-full accent-blue-500"
              />
              <span className="mt-2 font-medium">
                {formData[currentQuestion.key] || currentQuestion.min} /{" "}
                {currentQuestion.max}
              </span>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Back
              </button>
            )}

            {step < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="ml-auto px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyForm;
