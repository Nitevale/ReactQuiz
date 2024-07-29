import React from "react";
import erniLogo from "../assets/ERNILOGO2.png";

const LogoHolder = () => {
  return (
    <div className="w-full md:w-1/2 overflow-hidden">
      <img
        src={erniLogo}
        alt="ERNI LOGO"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LogoHolder;
