
import React, { useState, useEffect } from 'react';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

 
  useEffect(() => {
    fetch(`${apiUrl}/api/some-route`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Backend error:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Multi Quiz System</h1>
      {!selectedQuiz ? (
        <QuizList onSelectQuiz={(quiz) => setSelectedQuiz(quiz)} />
      ) : (
        <QuizPage quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
      )}
    </div>
  );
}

export default App;
