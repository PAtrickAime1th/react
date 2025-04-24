import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuestions(res.data.questions || []);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers });
      setScore(res.data.score);
    } catch (error) {
      alert("Failed to submit quiz.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quiz</h2>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this quiz.</p>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q.id} className="mb-4">
              <h5>{q.text}</h5>
              {q.options?.map((opt) => (
                <div key={opt.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleSelect(q.id, opt.id)}
                  />
                  <label className="form-check-label">{opt.text}</label>
                </div>
              ))}
            </div>
          ))}

          <button className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>

          {score !== null && (
            <div className="alert alert-info mt-3">
              <strong>Your Score:</strong> {score} / {questions.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default QuizPage;
