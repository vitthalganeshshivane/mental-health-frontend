import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import { FaUser } from "react-icons/fa";
import Lottie from "lottie-react";
import AiRobot from "../assets/AiRobot.json";

// Define questions separately for students and employees
const studentQuestions = [
  {
    key: "age",
    label: "What is your age?",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    key: "educationLevel",
    label:
      "Which of the following best describes your current course or study level?",
    type: "select",
    options: ["Diploma", "Undergraduate", "Postgraduate", "11th/12th", "Other"],
  },
  {
    key: "academicWorkload",
    label:
      "Are you currently involved in assignments, projects, or homework as part of your studies?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    key: "academicStress",
    label:
      "How often do you feel overwhelmed by your academic workload and responsibilities?",
    type: "select",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    key: "relaxActivities",
    label:
      "How often do you engage in activities that help you relax and reduce stress?",
    type: "select",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    key: "sleepQuality",
    label:
      "How would you rate the quality of your sleep during the academic term?",
    type: "select",
    options: ["Very Poor", "Poor", "Average", "Good", "Very Good"],
  },
  {
    key: "futureConfidence",
    label: "How confident are you about your academic and career future?",
    type: "select",
    options: [
      "Not at all confident",
      "Slightly confident",
      "Moderately confident",
      "Very confident",
      "Extremely confident",
    ],
  },
  {
    key: "socialSupport",
    label:
      "How supported do you feel by your family or friends regarding your mental and emotional well-being?",
    type: "select",
    options: [
      "Not at all supported",
      "Slightly supported",
      "Moderately supported",
      "Very supported",
      "Extremely supported",
    ],
  },
  {
    key: "counselingHelp",
    label:
      "Have you ever sought help from counseling or mental health services?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    key: "copingStrategies",
    label:
      "What activities or strategies do you use to cope with stress? (Select all that apply)",
    type: "multiselect",
    options: [
      "Exercise",
      "Socializing",
      "Hobbies",
      "Meditation",
      "Other",
      "None",
    ],
  },
];

const employeeQuestions = [
  {
    key: "age",
    label: "What is your age?",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    key: "jobRole",
    label: "What best describes your current job role?",
    type: "text",
    placeholder: "e.g. Software Developer, Manager, etc.",
  },
  {
    key: "workloadStress",
    label: "How often do you feel overwhelmed by your workload?",
    type: "select",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    key: "relaxActivities",
    label:
      "How often do you engage in activities that help you relax and reduce stress?",
    type: "select",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    key: "sleepQuality",
    label:
      "How would you rate the quality of your sleep during the last month?",
    type: "select",
    options: ["Very Poor", "Poor", "Average", "Good", "Very Good"],
  },
  {
    key: "jobSatisfaction",
    label: "How satisfied are you with your current job?",
    type: "select",
    options: [
      "Very Dissatisfied",
      "Dissatisfied",
      "Neutral",
      "Satisfied",
      "Very Satisfied",
    ],
  },
  {
    key: "socialSupport",
    label:
      "How supported do you feel by your coworkers and manager regarding your mental health?",
    type: "select",
    options: [
      "Not at all supported",
      "Slightly supported",
      "Moderately supported",
      "Very supported",
      "Extremely supported",
    ],
  },
  {
    key: "counselingHelp",
    label:
      "Have you ever sought help from counseling or mental health services?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    key: "copingStrategies",
    label:
      "What activities or strategies do you use to cope with stress? (Select all that apply)",
    type: "multiselect",
    options: [
      "Exercise",
      "Socializing",
      "Hobbies",
      "Meditation",
      "Other",
      "None",
    ],
  },
];

const SurveyForm = () => {
  const [userType, setUserType] = useState("");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const questions =
    userType === "student"
      ? studentQuestions
      : userType === "employee"
      ? employeeQuestions
      : [];

  // Handle change for normal inputs and multi-select for coping strategies
  const handleChange = (key, value) => {
    if (key === "copingStrategies" && Array.isArray(value)) {
      // For multiselects, handle toggle
      let current = formData[key] || [];
      if (current.includes(value)) {
        current = current.filter((v) => v !== value);
      } else {
        current.push(value);
      }
      setFormData({ ...formData, [key]: current });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleNext = () => {
    if (!formData[questions[step].key]) {
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

    let surveyPayload = { userType, ...formData };
    console.log({ userType, ...formData });

    // For multiselect copingStrategies ensure it sends array or stringified value as needed
    if (Array.isArray(formData.copingStrategies)) {
      surveyPayload.copingStrategies = formData.copingStrategies;
    }

    try {
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      const userId = loginData?.user?.id;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/suggestions/submit`,
        { userId, userInputs: surveyPayload },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Survey submitted successfully!");
      toast.success("you can see your Survey history on profile page");
      navigate("/results", { state: response.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    // First screen to select user type
    return (
      <>
        <div className="flex items-center justify-between bg-black px-20 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
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

        <div className="flex justify-center min-h-screen bg-holi px-4 gap-2 items-center">
          <div className="mt-20 max-w-lg w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6">Who are you?</h2>
            <button
              onClick={() => setUserType("student")}
              className="w-full mb-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Student
            </button>
            <button
              onClick={() => setUserType("employee")}
              className="w-full py-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Employee
            </button>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[step];

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between bg-black px-20 py-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
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

      {/* Survey */}
      <div className="flex justify-center min-h-screen bg-holi px-4 gap-2 ">
        <div className="mt-20">
          <Lottie animationData={AiRobot} loop={true} className="w-64 h-64" />{" "}
          <p className="text-center text-3xl font-bold text-blue-500 -mt-9 bg-gray-300/50 rounded-full ">
            Hii, here's Sara
          </p>
        </div>

        <div className="p-8 max-w-lg w-full h-auto mt-20 bg-white rounded-lg shadow-lg">
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

          {/* Input Types */}
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

          {currentQuestion.type === "multiselect" && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt) => {
                const selected = formData[currentQuestion.key]?.includes(opt);
                return (
                  <button
                    key={opt}
                    className={`px-4 py-2 rounded-xl border transition-all ${
                      selected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleChange(currentQuestion.key, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
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
