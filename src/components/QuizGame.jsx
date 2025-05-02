import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import questionsData from "../questions.json";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="score-display"
    >
      <h2>One Health Exam Completed 🎉</h2>
      <p className="score-text">
        Your score: {score} / {questions.length}
      </p>
    </motion.div>
  ) : (
    <div className="quiz-flow">
  
  <div className="progress-container">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            transition: { duration: 0.6 },
          }}
        />
      </div>
      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
        currentQuestionNumber={currentIndex + 1}
      />
    </div>
  );
}
