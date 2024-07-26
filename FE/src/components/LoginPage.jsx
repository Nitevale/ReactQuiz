import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import SideLogo from "./LogoHolder.jsx";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const hardcodedAdmin = {
      username: "admin",
      password: "pass123",
    };

    if (
      data.username === hardcodedAdmin.username &&
      data.password === hardcodedAdmin.password
    ) {
      dispatch(login({ username: data.username }));
      console.log("Login dispatched, navigating to /examiner");
      navigate("/examiner");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-16 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto bg-white overflow-hidden">
        <SideLogo />
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="mb-4">
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
