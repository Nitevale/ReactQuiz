import React from "react";
import { useNavigate } from 'react-router-dom';
import erniLogo from "../assets/ERNILOGO2.png";

const LogoHolder = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="w-full md:w-1/2 overflow-hidden">
      <img
        src={erniLogo}
        alt="ERNI LOGO"
        className="w-full h-full object-cover"
        onClick={goHome}
      />
    </div>
  );
};

export default LogoHolder;
