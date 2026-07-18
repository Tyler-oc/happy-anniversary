import { useState } from "react";
import "./App.css";
import Intro from "./Intro.jsx";
import Quiz from "./Quiz.jsx";
import Reveal from "./Reveal.jsx";

export default function App() {
  const [screen, setScreen] = useState("intro"); // 'intro' | 'quiz' | 'reveal'
  const [answers, setAnswers] = useState([]);

  function handleStart() {
    setScreen("quiz");
  }

  function handleAnswer(answer) {
    setAnswers((prev) => [...prev, answer]);
  }

  function handleFinish() {
    setScreen("reveal");
  }

  return (
    <>
      {/* Hidden SVG — grain/noise filter referenced in CSS via filter: url(#grain) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </svg>

      {screen === "intro" && <Intro onStart={handleStart} />}
      {screen === "quiz" && (
        <Quiz onAnswer={handleAnswer} onFinish={handleFinish} />
      )}
      {screen === "reveal" && <Reveal answers={answers} />}
    </>
  );
}
