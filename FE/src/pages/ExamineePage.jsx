import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import NameBox from "../components/NameBox";
import Lottie from "lottie-react";
import LoadAnimation from "../assets/LoadingAnimation.json";
import Scoreboard from "../components/Scoreboard";

const API_URL = "http://localhost:5297/api/Quiz";
const SCORE_API_URL = "http://localhost:5297/api/Score";

const ExamineePage = () => {
  const [isNameBoxVisible, setIsNameBoxVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleStart = (enteredName) => {
    setName(enteredName);
    setIsNameBoxVisible(false);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (questions.length > 0) {
      const newProgress = ((currentQuestionIndex) / questions.length) * 100;
      setProgress(newProgress);
    }
  }, [currentQuestionIndex, questions.length]);

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.questionID];
      const correctAnswer = question.choices.find(
        (choice) => choice.isCorrect
      );

      if (selectedAnswer?.choiceId === correctAnswer?.choiceId) {
        score += 1;
      }
    });

    return score;
  };

  const handleFinish = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    const data = {
      examineeName: name,
      score: finalScore
    };

    console.log("Data being sent to the server:", data);
    try {
      await axios.post(SCORE_API_URL, data);
      const leaderboardResponse = await axios.get(SCORE_API_URL);
      setLeaderboard(leaderboardResponse.data);
      setIsQuizFinished(true);
      setIsLoading(true);
    } catch (error) {
      console.error("Error submitting score or fetching leaderboard:", error.response?.data.errors);
    }
  };

  const handleNext = () => {
    const currentQuestionID = questions[currentQuestionIndex]?.questionID;

    if (!selectedAnswers[currentQuestionID]) {
      setError("Please select an answer before proceeding.");
      return;
    }

    setError("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleAnswerSelect = (questionID, choice) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionID]: {
          choiceId: choice.choiceId,
          choiceText: choice.choiceText,
        },
      };

      setError("");

      return updatedAnswers;
    });
  };

  const handleTryAgain = () => {
    setIsNameBoxVisible(false);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setProgress(0);
    setIsLoading(true);
  };

  const handleQuit = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {isLoading ? (
        <Lottie
          animationData={LoadAnimation}
          loop={true}
          className="w-48 h-48"
        />
      ) : (
        <>
          {isNameBoxVisible ? (
            <NameBox onStart={handleStart} />
          ) : isQuizFinished ? (
            <Scoreboard
              score={score}
              questions={questions}
              leaderboard={leaderboard}
              onTryAgain={handleTryAgain}
              onQuit={handleQuit}
            />
          ) : questions.length === 0 ? (
            <div className="text-center p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-bold mb-4">No Questions Available</h2>
              <p className="text-md mb-4">Please try again later.</p>
              <button
                onClick={handleQuit}
                className="px-4 py-2 bg-theme-ERNI text-white font-semibold rounded-lg shadow-md border 
                hover:bg-transparent hover:text-theme-ERNI hover:border-theme-ERNI"
              >
                Quit
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto">
              {questions.length > 0 && (
                <>
                  <div className="p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-bold mb-4">
                      {questions[currentQuestionIndex].questionText}
                    </h2>
                    <div className="space-y-2">
                      {questions[currentQuestionIndex].choices.map((choice) => (
                        <button
                          key={`${questions[currentQuestionIndex].questionID}-${choice.choiceId}`}
                          className={`w-full text-left p-2 border rounded-lg 
                            hover:font-bold hover:outline hover:outline-theme-ERNI
                            ${
                              selectedAnswers[
                                questions[currentQuestionIndex].questionID
                              ]?.choiceId === choice.choiceId
                                ? "bg-theme-ERNI text-white font-bold"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          onClick={() =>
                            handleAnswerSelect(
                              questions[currentQuestionIndex].questionID,
                              choice
                            )
                          }
                        >
                          {choice.choiceText}
                        </button>
                      ))}
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="mt-6 text-right">
                      <button
                        className={`px-4 py-2 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out ${
                          error
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-theme-ERNI text-white border border-theme-ERNI hover:bg-white hover:text-theme-ERNI"
                        }`}
                        onClick={handleNext}
                        disabled={!!error}
                      >
                        {currentQuestionIndex < questions.length - 1
                          ? "Next"
                          : "Finish"}
                      </button>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
                          Progress
                        </div>
                        <div className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-teal-600 bg-teal-200">
                          {Math.round(progress)}%
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="relative flex mb-2 items-center justify-between">
                          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-teal-600 h-2.5 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExamineePage;
