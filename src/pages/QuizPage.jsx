import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function QuizPage() {
  const { id } = useParams();  // Get quiz ID from URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [questions, setQuestions] = useState([]);  // Store questions
  const [answers, setAnswers] = useState({});  // Store user answers
  const [score, setScore] = useState(null);  // Store the score after submission
  const [loading, setLoading] = useState(true);  // Loading state for quiz data
  const [error, setError] = useState(null);  // Error state for quiz fetch failures
  const [correctAnswers, setCorrectAnswers] = useState([]); // Store correct answers
  const [win, setWin] = useState(null); // Whether user won or lost

  // Fetch quiz data when component mounts
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Unable to load quiz data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  // Handle answer selection
  const handleSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,  // Store the selected option for each question
    }));
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    try {
      // Send answers to the backend to store them and calculate score
      const res = await axios.post(
        `http://localhost:5000/api/quizzes/${id}/submit`,
        { answers }
      );
      // Set the score from the backend response
      setScore(res.data.score);
      setCorrectAnswers(res.data.correctAnswers);  // Store correct answers
      setWin(res.data.win); // Determine if the user won
    } catch (error) {
      alert("Failed to submit quiz.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center"> QUIZ AVAILABLE</h2>

        {/* Loading state */}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading questions...</p>
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : questions.length === 0 ? (
          <p className="text-center">No questions found for this quiz.</p>
        ) : (
          <>
            {/* Display questions */}
            {questions.map((q, index) => (
              <div key={q.id} className="mb-4 border-bottom pb-3">
                <h5>
                  {index + 1}. {q.text}
                </h5>

                {/* Display options for each question */}
                {q.options?.map((opt) => (
                  <div key={opt.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q.id}`}
                      id={`q-${q.id}-opt-${opt.id}`}
                      checked={answers[q.id] === opt.id} // Check if the answer is selected
                      onChange={() => handleSelect(q.id, opt.id)} // Update selected answer
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`q-${q.id}-opt-${opt.id}`}
                      style={{
                        color: correctAnswers.includes(opt.id)
                          ? "green"
                          : answers[q.id] === opt.id && answers[q.id] !== opt.id
                          ? "red"
                          : "",
                      }}
                    >
                      {opt.text}
                    </label>
                  </div>
                ))}
              </div>
            ))}

            {/* Submit button */}
            <div className="text-center">
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit Quiz
              </button>
            </div>

            {/* Display score after submission */}
            {score !== null && (
              <div className="alert alert-info mt-4 text-center">
                <strong>Your Score:</strong> {score} / {questions.length}
                <br />
                <strong>{win ? "🎉 You Win!" : "😢 You Lose!"}</strong>
              </div>
            )}
          </>
        )}

        {/* Back button */}
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;