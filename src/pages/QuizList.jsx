import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quizzes", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Available Quizz</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading quizzes...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : quizzes.length > 0 ? (
          <div className="row">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="col-md-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{quiz.title}</h5>
                    <p className="card-text text-muted">{quiz.description}</p>
                    {quiz.questions_count && (
                      <p className="text-muted"> {quiz.questions_count} questions</p>
                    )}
                    <Link to={`/quizzes/${quiz.id}`} className="btn btn-primary">
                       Take Quiz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No quizzes available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default QuizList;
