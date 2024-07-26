import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import ExaminerPage from "./components/ExaminerPage";

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/examiner" element={<ExaminerPage />} />
        </Routes>
    </Router>
  );
};

export default App;
