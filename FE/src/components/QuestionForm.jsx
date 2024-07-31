import React, { useState, useEffect } from "react";

const QuestionForm = ({ onSubmit, initialData = {} }) => {
  const [questionText, setQuestionText] = useState(
    initialData.questionText || ""
  );
  const [choices, setChoices] = useState(
    initialData.choices || [{ choiceText: "", isCorrect: false }, { choiceText: "", isCorrect: false }, { choiceText: "", isCorrect: false }, { choiceText: "", isCorrect: false }]
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    initialData.correctAnswer || ""
  );

  useEffect(() => {
    if (initialData.choices && initialData.choices.length > 0) {
      const formattedChoices = initialData.choices.map(choice => ({
        choiceText: choice.choiceText,
        isCorrect: choice.choiceText === initialData.correctAnswer
      }));
      setChoices(formattedChoices);
    }
  }, [initialData]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index].choiceText = value;
    if (newChoices[index].choiceText === correctAnswer) {
      newChoices[index].isCorrect = true;
    } else {
      newChoices[index].isCorrect = false;
    }
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newChoices = [...choices];
    newChoices.forEach((choice, i) => {
      choice.isCorrect = i === index;
    });
    setChoices(newChoices);
    setCorrectAnswer(newChoices[index].choiceText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      questionText,
      choices
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mt-5">
        <label className="block text-center text-lg font-medium">Question:</label>
        <textarea
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border border-gray-300 w-full min-h-16 max-h-16 mt-2 p-2 rounded-md resize-none"
        />
      </div>
      <div className="mt-4">
        <p className="text-center text-lg font-medium mb-2">Choices (Click the correct answer):</p>
        {choices.map((choice, index) => (
          <div key={index} className="flex items-center my-2">
            <input
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => handleCorrectAnswerChange(index)}
              className="mr-2"
            />
            <input
              type="text"
              value={choice.choiceText}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              className="border border-gray-300 bg-transparent rounded w-full p-2"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-500 text-white rounded px-4 py-2 font-semibold hover:bg-green-400 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
