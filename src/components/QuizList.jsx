
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizList({ onSelectQuiz }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quizzes')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Select a Quiz</h3>
      <ul className="list-group">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="list-group-item list-group-item-action"
            onClick={() => onSelectQuiz(quiz)}
            style={{ cursor: 'pointer' }}
          >
            {quiz.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
