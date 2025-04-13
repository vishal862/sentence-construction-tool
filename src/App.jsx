import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
   fetch("http://localhost:3000/data")
   .then((res)=> res.json())
   .then((data)=>{
    setQuestions(data.questions);
    setLoading(false);
    setResponse(Array(data.questions.length).fill([]));
    setUserAnswers(Array(data.questions.length).fill([]));
   })
   .catch((err)=>{
    console.log("error",err);
    setError("failed to load questions");
    setLoading(false);
   })
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
    </Router>
  )
}
