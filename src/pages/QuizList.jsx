import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { Link } from 'react-router-dom';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quizzes', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Quizzes</h2>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{quiz.title}</h5>
              <p className="card-text">{quiz.description}</p>
              {quiz.questions_count && (
                <p className="text-muted">Questions: {quiz.questions_count}</p>
              )}
              <Link to={`/quizzes/${quiz.id}`} className="btn btn-primary">
                Take Quiz
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No quizzes available at the moment.</p>
      )}
    </div>
  );
}

export default QuizList;
