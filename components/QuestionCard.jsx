import React, { useState } from 'react';

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleClick = (option) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === question.answer;
    setFeedback(correct ? 'Correct!' : `Wrong! Correct: ${question.answer}`);
    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      onAnswer(correct);
    }, 1000);
  };

  return (
    <div>
      <h2>{question.question}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {question.options.map((opt, i) => (
          <li key={i} style={{ margin: '0.5rem 0' }}>
            <button
              onClick={() => handleClick(opt)}
              disabled={selected !== null}
              style={{
                width: '100%',
                padding: '0.5rem',
                background:
                  selected === opt
                    ? opt === question.answer
                      ? '#c8e6c9'
                      : '#ffcdd2'
                    : '#e0e0e0',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}
