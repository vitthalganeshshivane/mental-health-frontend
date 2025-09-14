import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/HomeImage.webp";
import MentalHealthLogo from "../assets/mentalhealthlog.png";

const Landing = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={MentalHealthLogo} alt="logo" className="w-10 h-10" />
          <p className="text-3xl text-slate-600 font-semibold">MindCare</p>
        </div>
        <div className="flex text-xl text-slate-600 font-semibold gap-7">
          <div>
            <Link to="/login">Already have an Account - Login</Link>
          </div>
        </div>
        <div className="text-2xl bg-orange-600 rounded-full py-2 px-3">
          <Link
            to="/signup"
            className="text-lg items-center font-semibold text-white"
          >
            Create Account
          </Link>
        </div>
      </div>

      <div className="flex mt-12 items-center">
        <div className="py-2">
          <p className="text-7xl font-semibold">
            Healthy Minds, Happy Lives{" "}
            <span className="text-orange-600">Mental Health</span> Assistant
          </p>
          <p className="text-[1rem] text-slate-700 mt-3 mb-5 ">
            Your wellbeing matters. Take the survey and get personalized
            support.
          </p>
          <Link
            to="/login"
            className="text-2xl bg-orange-600 rounded-full py-2 px-3 text-lg align-center font-semibold text-white"
          >
            Get Started
          </Link>
        </div>
        <div>
          <img src={HomeImage} alt="Home" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-green-400 to-teal-500 py-10 text-white rounded-lg shadow-lg mt-5">
        <div className="text-center">
          <h2 className="text-xl font-bold">Stress</h2>
          <p>Management Support</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Anxiety</h2>
          <p>Coping Strategies</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Depression</h2>
          <p>Awareness & Help</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Counselling</h2>
          <p>For Students</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
