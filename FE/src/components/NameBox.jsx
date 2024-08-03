import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameBox = ({ onStart }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setName(e.target.value);
    setErrorMessage("");
  };

  const handleStartClick = () => {
    if (name.trim()) {
      onStart(name);
    } else {
      setErrorMessage("Please enter your name first!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Enter Your Name
      </h2>
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-400 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-theme-ERNI"
        />
        {errorMessage && (
          <span className="text-red-500 text-sm mt-2 block">{errorMessage}</span>
        )}
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          className="text-gray-500 hover:text-black transition"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
        <button
          className="px-4 py-1 bg-theme-ERNI text-white 
              border border-theme-ERNI 
              hover:bg-white hover:text-theme-ERNI 
              font-semibold rounded-lg shadow-md 
              transition duration-300 ease-in-out"
          onClick={handleStartClick}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default NameBox;
