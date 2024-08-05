import React from "react";

const Scoreboard = ({ score, questions, leaderboard, onTryAgain, onQuit }) => {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  const totalQuestions = questions.length;
  let message = "";
  let scoreColor = "";

  if (score === totalQuestions) {
    message = "Boss?! Perfect?! My Idol!";
    scoreColor = "text-green-600";
  } else if (score >= totalQuestions * 0.7) {
    message = "Bossing! Great Job!";
    scoreColor = "text-blue-600";
  } else if (score >= totalQuestions * 0.4) {
    message = "Ok lang yan!";
    scoreColor = "text-yellow-600";
  } else {
    message = "Haha xd";
    scoreColor = "text-red-600";
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-6 bg-white shadow-md rounded-lg md:mt-20 xs:mt-20">
        <h2 className={`text-lg font-bold mb-4 ${scoreColor}`}>{message}</h2>
        <p className="text-md mb-2">
          Score: <span className={`font-semibold ${scoreColor}`}>{score}</span>
        </p>
        <p className="text-md mb-4">Total Questions: {totalQuestions}</p>
        <h3 className="text-lg font-bold mt-6 mb-4 text-center">Leaderboard</h3>
        <div className="max-h-40 overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-b-black">Name</th>
                <th className="px-4 py-2 border border-b-black">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry) => (
                <tr key={entry.id}>
                  <td className="border px-4 py-2">{entry.examineeName}</td>
                  <td className="border px-4 py-2">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-6">
          <div className="flex flex-row gap-2 w-full">
            <button
              onClick={onQuit}
              className="flex-grow px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md border 
              hover:bg-transparent hover:text-red-500 hover:border-red-500"
            >
              Quit
            </button>
            <button
              onClick={onTryAgain}
              className="flex-grow px-4 py-2 bg-theme-ERNI text-white font-semibold rounded-lg shadow-md border 
              hover:bg-transparent hover:text-theme-ERNI hover:border-theme-ERNI"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
