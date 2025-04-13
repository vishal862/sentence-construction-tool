import React from "react";
import { useNavigate } from "react-router-dom";

export default function Result({ questions, userAnswers, score,onRestart }) {
  const navigate = useNavigate();
  const handleRestart = () => {
    onRestart();
    navigate("/quiz");
  };

  const isFullyAnsweredAndCorrect = (userResponse, correctAnswer) => {
    if (!userResponse || userResponse.length !== correctAnswer.length) {
      return false; // Not all blanks were answered
    }
    return userResponse.every((answer, i) => answer === correctAnswer[i]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="rounded-full bg-green-100 border-4 border-green-500 w-24 h-24 flex items-center justify-center">
          <span className="text-3xl font-bold text-green-600">{score}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">Overall Score</p>
      </div>

      <div className="mb-4 text-center text-gray-700">
        {score >= questions.length ? (
          <p>
            While you correctly formed several sentences, there are a couple of
            areas where improvement is needed. Pay close attention to sentence
            structure and word placement to ensure clarity and correctness.
            Review your responses below for more details.
          </p>
        ) : (
          <>
            <p>
              While you correctly formed several sentences, there are a couple
              of areas where improvement is needed.
            </p>
            <p className="mt-1">
              Pay close attention to sentence structure and word placement to
              ensure clarity and correctness.
            </p>
            <p className="mt-1">
              Review your responses below for more details.
            </p>
          </>
        )}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => {}}
          className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-md py-2 px-4 text-sm"
        >
          Go to Dashboard
        </button>
      </div>

      <hr className="border-t border-gray-200 mb-2" />

      <ul className="space-y-5">
        {questions.map((q, index) => (
          <li
            key={q.questionId}
            className="bg-gray-50 rounded-md p-3 shadow-sm border border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-1">
              <span className="bg-gray-100 rounded-2xl p-1">Prompt </span>
              <span className="font-semibold">
                {index + 1}/{questions.length}
              </span>
            </p>
            <p className="text-gray-800 mb-1">
              {q.question.split("_____________").reduce((acc, part, i) => {
                acc.push(part);
                if (i < q.correctAnswer.length) {
                  acc.push(
                    <span key={`correct-${index}-${i}`}>
                      {q.correctAnswer[i]}
                    </span>
                  );
                }
                return acc;
              }, [])}
            </p>

            <div className="text-sm bg-blue-50 rounded-md p-2">
              <span
                className={`font-semibold ${
                  isFullyAnsweredAndCorrect(userAnswers[index], q.correctAnswer)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {isFullyAnsweredAndCorrect(userAnswers[index], q.correctAnswer)
                  ? "Correct: "
                  : "Incorrect: "}
              </span>
              <span>
                Your response:{" "}
                {q.question.split("_____________").map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < q.correctAnswer.length && (
                      <span>{userAnswers[index]?.[i] || "__________"}</span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center">
        <button
          onClick={handleRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 px-6 text-sm"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
