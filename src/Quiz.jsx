import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import questions from "./questions.js";
import BubbleOption from "./BubbleOption.jsx";

export default function Quiz({ onAnswer, onFinish }) {
  const total = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track the picked option *index* per question (option values can be
  // identical — e.g. placeholder "___" — so comparing by value is wrong).
  const [picked, setPicked] = useState(() => questions.map(() => null));

  // Each question block's top offset, so we know how far to tug the sheet.
  const blockRefs = useRef([]);
  const [offsets, setOffsets] = useState([]);

  useLayoutEffect(() => {
    const measure = () => {
      const tops = blockRefs.current.map((el) => (el ? el.offsetTop : 0));
      setOffsets(tops);
    };
    measure();
    window.addEventListener("resize", measure);
    // Re-measure once the handwriting font settles (it changes line heights)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The paper's y is the negative of the current question's offset from the top.
  const base = offsets.length ? offsets[0] : 0;
  const targetY = offsets.length ? -(offsets[currentIndex] - base) : 0;

  function handleOption(qIndex, optIndex, optValue) {
    // Only the active question is interactive, and only once.
    if (qIndex !== currentIndex) return;
    if (picked[qIndex] !== null) return;

    setPicked((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
    onAnswer(optValue);

    // Let the bubble fill in + a beat to see it, then tug the sheet.
    setTimeout(() => {
      if (qIndex + 1 >= total) {
        onFinish();
      } else {
        setCurrentIndex(qIndex + 1);
      }
    }, 1100);
  }

  return (
    <div className="quiz-viewport">
      <div className="quiz-header">
        <div className="progress-dots">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`dot ${
                i < currentIndex ? "done" : i === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <p className="progress-label">
          Question {currentIndex + 1} of {total}
        </p>
      </div>

      <motion.div
        className="paper-roll"
        animate={{ y: targetY }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        {questions.map((q, qIndex) => {
          const state =
            qIndex < currentIndex
              ? "settled"
              : qIndex === currentIndex
              ? "active"
              : "upcoming";
          return (
            <div
              key={q.id}
              ref={(el) => (blockRefs.current[qIndex] = el)}
              className={`question-block ${state}`}
            >
              <h2 className="prompt">{q.prompt}</h2>

              {q.image && (
                <img
                  src={q.image}
                  alt={`Question ${qIndex + 1}`}
                  className="question-image"
                />
              )}

              <div className="options">
                {q.options.map((opt, i) => (
                  <BubbleOption
                    key={i}
                    text={opt}
                    onSelect={() => handleOption(qIndex, i, opt)}
                    selected={picked[qIndex] === i}
                    disabled={qIndex !== currentIndex || picked[qIndex] !== null}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
