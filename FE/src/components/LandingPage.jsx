import React from "react";
import SideLogo from "./LogoHolder.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen py-16 px-4">
      <div className="bg-white overflow-hidden w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <SideLogo/>
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Welcome to Quiz
              <span className="text-theme-ERNI">ERNI</span>
              a!
            </h2>
            <p className="text-lg md:text-xl mb-6">
              How well do you know
              <span className="text-theme-ERNI"> ERNI</span>?
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-theme-ERNI text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
