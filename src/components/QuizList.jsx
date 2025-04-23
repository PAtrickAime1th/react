import React, { useEffect, useState } from "react";
import API from "../api";

export default function QuizList({ onSelectQuiz }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get("/quizzes").then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Available Quizzes</h3>
      <ul className="list-group">
        {quizzes.map(q => (
          <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
            {q.title}
            <button className="btn btn-outline-primary" onClick={() => onSelectQuiz(q.id)}>Start</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
