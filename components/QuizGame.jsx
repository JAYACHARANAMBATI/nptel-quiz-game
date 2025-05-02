import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import questionsData from '../data/questions.json';

export default function QuizGame() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // shuffle questions on load
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return showScore ? (
    <div>
      <h2>Quiz Finished!</h2>
      <p>Your score: {score} / {questions.length}</p>
    </div>
  ) : (
    <QuestionCard
      question={questions[currentIndex]}
      onAnswer={handleAnswer}
    />
  );
}
