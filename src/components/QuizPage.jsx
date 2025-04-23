// src/components/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuizPage({ quiz, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${quiz.id}/questions`)
      .then(async (res) => {
        const questionsData = res.data;

        const questionsWithOptions = await Promise.all(
          questionsData.map(async (q) => {
            const optionsRes = await axios.get(`http://localhost:5000/api/questions/${q.id}/options`);
            return { ...q, options: optionsRes.data };
          })
        );
        setQuestions(questionsWithOptions);
      });
  }, [quiz]);

  const handleSelect = (questionId, optionId) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: optionId });
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.is_correct);
      if (correctOption && answers[q.id] === correctOption.id) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id]);

  return (
    <div>
      <button className="btn btn-secondary mb-4" onClick={onBack}>← Back</button>
      <h2>{quiz.title}</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <h5>{index + 1}. {q.question_text}</h5>
          {q.options.map((opt) => {
            const isSelected = answers[q.id] === opt.id;
            const isCorrect = opt.is_correct;

            const getOptionStyle = () => {
              if (!submitted) return '';
              if (isSelected && isCorrect) return 'list-group-item-success';
              if (isSelected && !isCorrect) return 'list-group-item-danger';
              if (!isSelected && isCorrect) return 'list-group-item-success';
              return '';
            };

            return (
              <div key={opt.id} className={`form-check list-group-item ${getOptionStyle()}`}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  id={`q-${q.id}-opt-${opt.id}`}
                  value={opt.id}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => handleSelect(q.id, opt.id)}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor={`q-${q.id}-opt-${opt.id}`}>
                  {opt.option_text}
                </label>
              </div>
            );
          })}
        </div>
      ))}

      {!submitted && allAnswered && (
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit Quiz</button>
      )}

      {submitted && (
        <div className="alert alert-info mt-4">
          <h4>🎉 You scored {score} out of {questions.length}</h4>
        </div>
      )}
    </div>
  );
  {submitted && (
    <div className="alert alert-info mt-4">
      <h4>🎉 You scored {score} out of {questions.length}</h4>
    </div>
  )}
  
}

export default QuizPage;
