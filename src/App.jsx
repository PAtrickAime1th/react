import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";  // Import Navbar
import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [quizId, setQuizId] = useState(null);

  // Check if the token is valid (ensure user remains logged in after refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />  {/* Navbar visible on all pages */}
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={loggedIn ? <QuizList onSelectQuiz={setQuizId} /> : <Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route
          path="/quiz/:id"
          element={loggedIn ? <Quiz quizId={quizId} /> : <Login onLogin={() => setLoggedIn(true)} />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
