import React from "react";
import QuizGame from "./components/QuizGame";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <QuizGame />
      </main>
      <Footer />
    </div>
  );
}
