import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice.js";
import SideLogo from "../components/LogoHolder.jsx";
import axios from "axios";

const USER_API_URL = "http://localhost:5297/api/User";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${USER_API_URL}/login`, {
        username: data.username,
        password: data.password,
      });

      const { message, user: role } = response.data;

      if (message === "Login successful") {
        dispatch(login({ username: data.username, role }));
        console.log("Login successful, navigating to /examiner");
        navigate("/examiner");
      } else {
        setErrorMessage("Unexpected response from server");
      }
    } catch (error) {
      if (401) {
        setErrorMessage("Invalid username or password");
      } else {
        console.error("Error logging in:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div
      className="flex items-center justify-center 
      min-h-screen py-16 px-4 max-sm:py-24"
    >
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto overflow-hidden">
        <SideLogo />
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
          {errorMessage && (
            <span className="text-red-500 mb-4">{errorMessage}</span>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="mb-4">
              <div className="">
                <button
                  onClick={goBack}
                  className="mb-2 text-theme-base rounded hover:text-black"
                >
                  <i className="fa-solid fa-right-from-bracket rotate-180"></i>
                </button>
              </div>
              <label
                htmlFor="username"
                className="block text-theme-ERNI font-bold mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className="border-2 p-2 w-full"
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-theme-ERNI font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="border-2 p-2 w-full"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-theme-ERNI text-white 
              border border-theme-ERNI 
              hover:bg-white hover:text-theme-ERNI 
              py-2 px-4 w-full font-semibold rounded 
              transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
