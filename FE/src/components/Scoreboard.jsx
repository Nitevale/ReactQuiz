import React from 'react';

const Scoreboard = ({ score, questions, leaderboard, onTryAgain, onQuit }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-4">Quiz Completed!</h2>
        <p className="text-md mb-2">Score: <span className="font-semibold text-green-600">{score}</span></p>
        <p className="text-md mb-4">Total Questions: {questions.length}</p>
        <h3 className="text-lg font-bold mt-6 mb-4">Leaderboard</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.examineeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-around mt-6">
          <button
            onClick={onTryAgain}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Try Again
          </button>
          <button
            onClick={onQuit}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
