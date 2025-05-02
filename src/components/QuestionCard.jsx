import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function QuestionCard({
  question,
  onAnswer,
  currentQuestionNumber,
}) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleClick = (option) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === question.answer;
    setFeedback(correct ? "Correct!" : `Wrong! Correct: ${question.answer}`);
    setTimeout(() => {
      setSelected(null);
      setFeedback(null);
      onAnswer(correct);
    }, 1000);
  };

  const getButtonClass = (option) => {
    if (selected === null) return "option-button"; // Default state
    if (option === question.answer) return "option-button correct"; // Correct answer always green after selection
    if (option === selected) return "option-button incorrect"; // Selected incorrect answer red
    return "option-button disabled"; // Other options disabled and greyed out
  };

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="question-header">
        <div className="exam-header">
          
          <span className="question-number">
            Question {currentQuestionNumber}
          </span>
        </div>
        <h2 className="question-text">{question.question}</h2>
      </div>
      <ul className="options-list">
        {question.options.map((opt, i) => (
          <motion.li
            key={i}
            className="option-item"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(opt)}
              disabled={selected !== null}
              className={getButtonClass(opt)}
            >
              {opt}
            </motion.button>
          </motion.li>
        ))}
      </ul>
      {feedback && (
        <motion.div
          className={`feedback-container ${
            feedback.startsWith("Correct") ? "correct" : "incorrect"
          }`}
          initial={{ x: feedback.startsWith("Correct") ? 50 : -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="feedback-icon">
            {feedback.startsWith("Correct") ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✓
              </motion.span>
            ) : (
              <motion.span
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ✕
              </motion.span>
            )}
          </div>
          <motion.span
            className="feedback-text"
            initial={{ y: 10 }}
            animate={{ y: 0 }}
          >
            {feedback}
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
};
