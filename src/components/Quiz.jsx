import React, { useEffect, useState } from "react";
import API from "../api";

export default function Quiz({ quizId }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get(`/quiz/${quizId}`).then(res => setQuestions(res.data));
  }, [quizId]);

  return (
    <div className="container mt-4">
      <h3>Quiz</h3>
      {questions.map((q, i) => (
        <div key={q.id} className="card mb-3 p-3">
          <h5>{i + 1}. {q.text}</h5>
          {q.options.map(opt => (
            <div key={opt.id}>
              <input type="radio" name={`q${q.id}`} className="form-check-input me-2" />
              <label>{opt.text}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
