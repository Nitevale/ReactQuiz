import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ExaminerPage from "./pages/ExaminerPage";

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
