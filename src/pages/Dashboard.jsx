import React from "react";
import { useNavigate, Link } from "react-router-dom";
import MentalHealthLogo from "../assets/mentalhealthlog.png";
import { FaUser } from "react-icons/fa";
import Lottie from "lottie-react";
import AiRobot from "../assets/AiRobot.json";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const texts = [
    "Welcome to Your AI Powered Mental Health Assistant",
    "Here to Support You Anytime",
    "Take Care of Your Mind & Body",
  ];

  const [index, setIndex] = useState(0); // which text
  const [subIndex, setSubIndex] = useState(0); // which character
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      // pause before deleting
      setTimeout(() => setDeleting(true), 700);
      return;
    }

    if (subIndex === 0 && deleting) {
      // move to next text
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? 25 : 60
    ); // speed (faster deleting)

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, texts, index]);

  // blinking cursor
  useEffect(() => {
    const cursor = setInterval(() => {
      setBlink((prev) => !prev);
    }, 300);
    return () => clearInterval(cursor);
  }, []);

  return (
    // <div className="w-full min-h-screen bg-gray-200/30">
    // <div className="w-full min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400">
    <div className="w-full min-h-screen bg-holi">
      <div className="flex flex-wrap items-center justify-between bg-black px-20 py-4">
        <div className="flex items-center gap-2">
          <img src={MentalHealthLogo} alt="logo" className="w-10 h-10" />
          <p className="text-3xl text-white font-semibold">MindCare</p>
        </div>
        <div className="border-2 border-white rounded-full py-2 px-3 cursor-pointer">
          <FaUser size={24} color="white" />
        </div>
      </div>
      <div className="w-full text-center mt-10">
        <span className="relative inline-block pb-2">
          <span className="text-3xl md:text-4xl font-bold text-[#1D63ED]">
            Your Personal AI Assistant
          </span>
          <svg
            className="absolute left-0 bottom-0 w-full h-4"
            viewBox="0 0 200 40"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 30 Q100 -10, 200 30"
              stroke="#1D63ED"
              strokeWidth="7"
              fill="transparent"
            />
          </svg>
        </span>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Lottie animationData={AiRobot} loop={true} className="w-64 h-64" />

        <div className="relative border-2 border-blue-700  bg-white rounded-lg p-5 shadow-[0_0_20px_rgba(29,99,237,0.4)] max-w-md">
          <div className="absolute -left-4 top-8 w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-blue-700"></div>
          <p className="text-4xl font-bold text-blue-800">Hello, I Am Sara.</p>
          <p className="text-xl text-slate-600 font-semibold">
            {texts[index].substring(0, subIndex)}
            <span className="text-green-600">{blink ? "|" : " "}</span>
          </p>
          {/* <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            I can help you track your{" "}
            <span className="font-semibold">mood</span>, suggest{" "}
            <span className="font-semibold">relaxation exercises</span>, and
            guide you through{" "}
            <span className="font-semibold">mental wellness</span>. Let's start
            this journey together 🚀
          </p> */}
        </div>
      </div>

      <div className="px-20 text-center">
        <p className="text-4xl font-semibold text-blue-500">
          You are Just One Click Away to Check Your <br />
          <span className="text-[#1D63ED]">Mental Health</span>
        </p>

        <button
          className="bg-blue-500 rounded-full py-2 px-3 text-lg align-center text-white mt-5 cursor-pointer"
          onClick={() => navigate("/survey-form")}
        >
          Take Survey
        </button>
      </div>
    </div>
    // </div>
    // <div style={styles.container}>
    //   <h1 style={styles.title}>Welcome to Your Dashboard</h1>
    //   <button style={styles.button} onClick={() => navigate("/survey-form")}>
    //     Take Survey
    //   </button>
    //   <button style={styles.button} onClick={() => navigate("/survey-history")}>
    //     View History
    //   </button>
    // </div>
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
