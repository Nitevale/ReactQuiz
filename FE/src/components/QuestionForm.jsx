import React, { useState, useEffect } from "react";

const QuestionForm = ({ onSubmit, initialData = {}, readOnly = false }) => {
  const [questionText, setQuestionText] = useState(
    initialData.questionText || ""
  );
  const [choices, setChoices] = useState(
    initialData.choices && initialData.choices.length > 0
      ? initialData.choices
      : [
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
          { choiceText: "", isCorrect: false },
        ]
  );

  useEffect(() => {
    if (initialData.choices && initialData.choices.length > 0) {
      const formattedChoices = initialData.choices.map((choice) => ({
        choiceText: choice.choiceText,
        isCorrect: choice.isCorrect || false,
      }));
      setChoices(formattedChoices);
    }
  }, [initialData]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index].choiceText = value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newChoices = [...choices];
    newChoices.forEach((choice, i) => {
      choice.isCorrect = i === index;
    });
    setChoices(newChoices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      questionText,
      choices,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="">
        <label className="block text-center text-lg font-medium">
          Question:
        </label>
        <textarea
          type="text"
          required
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className={`border border-gray-300 w-full min-h-24 max-h-24 mt-2 p-2 rounded-md resize-none ${
            readOnly ? "bg-gray-100" : ""
          }`}
          readOnly={readOnly}
        />
      </div>
      <div className="mt-4">
        <p className="text-center text-lg font-medium mb-2">Choices:</p>
        {choices.map((choice, index) => (
          <div key={index} className="flex items-center my-2">
            {!readOnly && (
              <div className="relative mr-2">
                <input
                  required
                  type="radio"
                  name="correctAnswer"
                  checked={choice.isCorrect}
                  onChange={() => handleCorrectAnswerChange(index)}
                  className="absolute opacity-0 w-0 h-0"
                />
                <div
                  className={`w-6 h-6 border border-gray-300 rounded-full cursor-pointer ${
                    choice.isCorrect ? "bg-green-500" : "bg-white"
                  } flex items-center justify-center`}
                  onClick={() => handleCorrectAnswerChange(index)}
                >
                  {choice.isCorrect && (
                    <span className="text-white text-xs">✔</span>
                  )}
                </div>
              </div>
            )}
            <input
              type="text"
              required
              value={choice.choiceText}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className={`border ${
                choice.isCorrect && readOnly
                  ? "border-green-500 outline outline-green-500"
                  : "border-gray-300"
              } bg-transparent rounded w-full p-2 ${
                readOnly ? "bg-gray-100" : ""
              }`}
              readOnly={readOnly}
            />
          </div>
        ))}
      </div>
      {!readOnly ? (
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white rounded px-4 py-2 font-semibold hover:bg-green-400 w-full"
        >
          Add
        </button>
      ) : null}
    </form>
  );
};

export default QuestionForm;
