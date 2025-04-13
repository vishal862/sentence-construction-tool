import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions[currentQuestionIndex]?.correctAnswer?.length || 0).fill(
      null
    )
  );
  const [timer, setTimer] = useState(30);
  const [options, setOptions] = useState(
    questions[currentQuestionIndex]?.options?.slice() || []
  );

  const currentQuestion = questions[currentQuestionIndex];
  const numberOfQuestions = questions.length;
  
  //When you store a value in a useRef object, it doesn't trigger a re-render of the component when the value changes. This is different from state variables, where changing the value triggers a re-render.
  const hasHandledTimeout = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOptions(currentQuestion?.options?.slice() || []);
    setSelectedAnswers(
      Array(currentQuestion?.correctAnswer?.length || 0).fill(null)
    );
    setTimer(30);
    hasHandledTimeout.current = false;
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1 && !hasHandledTimeout.current) {
          hasHandledTimeout.current = true;
          setTimeout(() => {
            handleNext();
          }, 0);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleBlankClick = (index) => {
    const newSelected = [...selectedAnswers];
    const removed = newSelected[index];
    if (removed !== null) {
      setOptions((prev) => [...prev, removed]);
      newSelected[index] = null;
      setSelectedAnswers(newSelected);
    }
  };

  const handleOptionClick = (option) => {
    const filledIndex = selectedAnswers.findIndex((ans) => ans === option);
    if (filledIndex !== -1) {
      handleBlankClick(filledIndex);
      return;
    }

    const emptyIndex = selectedAnswers.findIndex((ans) => ans === null);
    if (emptyIndex === -1) return;

    const newSelected = [...selectedAnswers];
    newSelected[emptyIndex] = option;
    setSelectedAnswers(newSelected);

    setOptions((prev) => prev.filter((opt) => opt !== option));
  };

  const handleNext = () => {
    onAnswerSubmit(selectedAnswers);
    setSelectedAnswers(
      Array(questions[currentQuestionIndex]?.correctAnswer?.length || 0).fill(
        null
      )
    );
  };
  const handleQuit = () => {
    navigate("/");
  };
  const allFilled = selectedAnswers.every((ans) => ans !== null);

  const renderQuestionWithBlanks = () => {
    let blankCounter = 0;
    return (
      currentQuestion?.question?.split(" ").map((word, i) => {
        if (word?.includes("___")) {
          const index = blankCounter++;
          return (
            <span
              key={i}
              className="inline-block w-20 sm:w-28 border-b-2 border-black text-center mx-1 cursor-pointer"
              onClick={() => handleBlankClick(index)}
            >
              {selectedAnswers[index] || "___"}
            </span>
          );
        }
        return (
          <span key={i} className="mx-1">
            {word}
          </span>
        );
      }) || null
    );
  };

  const progressBarStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    marginBottom: "10px",
  };

  const progressLineStyle = (index) => ({
    flexGrow: 1,
    height: "5px",
    backgroundColor: index <= currentQuestionIndex ? "gold" : "lightgray",
  });
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-2 py-4">
      <div className="w-full max-w-2xl bg-white rounded-md shadow-md p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 font-semibold text-sm sm:text-base">
          <div>Time Left: {timer} sec</div>
          <button
            onClick={handleQuit}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-100 text-sm"
          >
            Quit
          </button>
        </div>

        <div style={progressBarStyle} className="mb-4">
          {Array.from({ length: numberOfQuestions }).map((_, index) => (
            <div key={index} style={progressLineStyle(index)}></div>
          ))}
        </div>

        <h2 className="text-base sm:text-lg mb-4 font-medium text-gray-800">
          Question {currentQuestionIndex + 1}
        </h2>
        <p className="mb-4 text-gray-700 text-sm sm:text-base">
          {renderQuestionWithBlanks()}
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="border px-2 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-100 text-xs sm:text-sm text-gray-700"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            disabled={!allFilled}
            onClick={handleNext}
            className={`px-4 py-2 rounded text-white text-sm ${
              allFilled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
