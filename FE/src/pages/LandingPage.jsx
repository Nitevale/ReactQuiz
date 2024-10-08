import React from "react";
import SideLogo from "../components/LogoHolder.jsx";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center 
      min-h-screen py-16 px-4 max-sm:py-24"
    >
      <div className="overflow-hidden w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <SideLogo />
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Welcome to Quiz
              <span className="text-theme-ERNI">ERNI</span>
              a!
            </h2>
            <p className="text-lg md:text-lg mb-6">
              How well do you know the
              <span className="text-theme-ERNI"> ERNI</span> Bootcampers?
            </p>
            <div className="flex flex-row gap-4
            max-sm:flex-col">
            <button
              onClick={() => navigate("/examinee")}
              className="px-6 py-3 bg-theme-ERNI text-white 
              border border-theme-ERNI 
              hover:bg-white hover:text-theme-ERNI 
              font-semibold rounded-lg shadow-md 
              transition duration-300 ease-in-out"
            >
              Take Quiz
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-white-ERNI text-theme-ERNI 
              border border-theme-ERNI 
              hover:bg-theme-ERNI hover:text-white
              font-semibold rounded-lg shadow-md 
              transition duration-300 ease-in-out"
            >
              Add a Question
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
