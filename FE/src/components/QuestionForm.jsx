import React, { useState } from "react";

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [questionText, setQuestionText] = useState(initialData.questionText || "");
  const [choices, setChoices] = useState(initialData.choices || ["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(initialData.correctAnswer || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ questionText, choices, correctAnswer });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>
      <div>
        {choices.map((choice, index) => (
          <div key={index}>
            <label>Choice {index + 1}:</label>
            <input
              type="text"
              value={choice}
              onChange={(e) => {
                const newChoices = [...choices];
                newChoices[index] = e.target.value;
                setChoices(newChoices);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <label>Correct Answer:</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
