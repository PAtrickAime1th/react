// src/App.jsx
import React, { useState } from 'react';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="container mt-5">
      <h1 className="mb-4"> Multi Quiz system</h1>
      {!selectedQuiz ? (
        <QuizList onSelectQuiz={(quiz) => setSelectedQuiz(quiz)} />
      ) : (
        <QuizPage quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
      )}
    </div>
  );
}

export default App;
