import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        <div className="branding-container">
          <span className="nptel-pill">NPTEL Practice Quiz</span>
          <h1 className="exam-title">
            One Health Exam
            <span className="exam-subtitle">Certification Preparation</span>
          </h1>
        </div>
      </div>
    </motion.nav>
  );
}
