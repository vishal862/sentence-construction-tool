import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

export default function App() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch("https://sentense-backend-3.onrender.com/data")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
        setResponse(Array(data.questions.length).fill([]));
        setUserAnswers(Array(data.questions.length).fill([]));
      })
      .catch((err) => {
        console.log("error", err);
        setError("failed to load questions");
        setLoading(false);
      });
  }, []);

  const handleAnswerSubmit = (answers) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answers;
    setUserAnswers(newUserAnswers);

    const currentQuestion = questions[currentQuestionIndex];
    if (
      currentQuestion &&
      JSON.stringify(answers) === JSON.stringify(currentQuestion.correctAnswer)
    ) {
      setScore((prevScore) => prevScore + 10);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/result");
    }
  };

  const handleRestartQuiz = () => {
    setResponse(Array(questions.length).fill([]));
    setScore(0);
    setUserAnswers(Array(questions.length).fill([]));
    setCurrentQuestionIndex(0);
    navigate("/quiz");
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/quiz"
        element={
          <Quiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerSubmit={handleAnswerSubmit}
          />
        }
      />
      <Route
        path="/result"
        element={
          <Result
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            onRestart = {handleRestartQuiz}
          />
        }
      />
    </Routes>
  );
}
