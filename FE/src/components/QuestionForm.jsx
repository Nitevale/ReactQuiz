import React, { useState } from "react";

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [questionText, setQuestionText] = useState(
    initialData.questionText || ""
  );
  const [choices, setChoices] = useState(
    initialData.choices || ["", "", "", ""]
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    initialData.correctAnswer || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ questionText, choices, correctAnswer });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-wallpaper">
      <div className="mt-5 text-center">
        <label>Question:</label>
        <textarea
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="flex gap-2 border border-black w-full min-h-16 max-h-16 mt-2"
        />
      </div>
      <div className="">
        <p className="text-center my-2">{`Choices (Click the correct answer):`}</p>
        {choices.map((choice, index) => (
          <div key={index} className="flex items-center my-5">
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === choice}
              onChange={() => setCorrectAnswer(choice)}
              className="mr-2"
            />
            <label className="flex gap-2"></label>
            <input
              type="text"
              value={choice}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[index] = e.target.value;
                setChoices(newChoices);
                // Update correct answer if the edited choice was the correct answer
                if (correctAnswer === choice) {
                  setCorrectAnswer(e.target.value);
                }
              }}
              className="border border-b-black bg-transparent rounded w-full"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white rounded px-2 py-2 font-semibold hover:bg-green-400"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;