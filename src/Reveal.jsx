import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import questions from "./questions.js";
import BubbleOption from "./BubbleOption.jsx";

function launchConfetti() {
  const burst = (opts) =>
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#c0392b", "#1a56db", "#e0b400", "#1a1a1a", "#f7f3e9"],
      ...opts,
    });

  burst({ origin: { x: 0.5, y: 0.5 } });
  setTimeout(() => burst({ origin: { x: 0.3, y: 0.55 }, angle: 120 }), 120);
  setTimeout(() => burst({ origin: { x: 0.7, y: 0.55 }, angle: 60 }), 240);
}

export default function Reveal({ answers }) {
  const [showStamp, setShowStamp] = useState(false);
  const [landed, setLanded] = useState(false);

  // Stage 1 zoom is declarative on the sheet; after the pull-back + a beat,
  // bring on the stamp.
  useEffect(() => {
    const t = setTimeout(() => setShowStamp(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Fired when the slam spring settles: confetti + trigger the impact pulse.
  function handleLanded() {
    if (landed) return;
    setLanded(true);
    launchConfetti();
  }

  return (
    <div className="reveal-viewport">
      <motion.div
        className="paper-roll reveal-sheet"
        initial={{ scale: 1 }}
        animate={{ scale: 0.55 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
      >
        {questions.map((q, qIndex) => (
          <div key={q.id} className="question-block settled">
            <h2 className="prompt">{q.prompt}</h2>
            <div className="options">
              {q.options.map((opt, i) => {
                // Match the picked answer by value, first occurrence only
                // (keeps placeholder duplicates from all filling in).
                const picked =
                  answers[qIndex] === opt && q.options.indexOf(opt) === i;
                return (
                  <BubbleOption
                    key={i}
                    text={opt}
                    onSelect={() => {}}
                    prefilled={picked}
                    disabled
                  />
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>

      {showStamp && (
        <motion.div
          className="stamp"
          initial={{ scale: 2.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: -8, opacity: 1 }}
          transition={{ type: "spring", stiffness: 700, damping: 24, mass: 0.9 }}
          onAnimationComplete={handleLanded}
        >
          {/* Inner wrapper does the quick impact pulse once the slam lands */}
          <motion.div
            className="stamp-inner"
            animate={landed ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <svg className="stamp-svg" viewBox="0 0 320 200">
              <defs>
                {/* Grunge: turbulence → luminance mask → knock worn speckle
                    holes out of the ink */}
                <filter
                  id="stamp-grunge"
                  x="-15%"
                  y="-15%"
                  width="130%"
                  height="130%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.5"
                    numOctaves="4"
                    seed="12"
                    result="noise"
                  />
                  <feColorMatrix
                    in="noise"
                    type="luminanceToAlpha"
                    result="lum"
                  />
                  <feComponentTransfer in="lum" result="mask">
                    <feFuncA
                      type="discrete"
                      tableValues="1 1 1 1 1 0 1 1 1 1 0 1 1"
                    />
                  </feComponentTransfer>
                  <feComposite in="SourceGraphic" in2="mask" operator="in" />
                </filter>
              </defs>

              <g filter="url(#stamp-grunge)" fill="#c0392b">
                {/* rounded-rectangle double border */}
                <rect
                  x="12"
                  y="12"
                  width="296"
                  height="176"
                  rx="20"
                  fill="none"
                  stroke="#c0392b"
                  strokeWidth="9"
                />
                <rect
                  x="27"
                  y="27"
                  width="266"
                  height="146"
                  rx="13"
                  fill="none"
                  stroke="#c0392b"
                  strokeWidth="4"
                />
                <text
                  className="stamp-text"
                  x="160"
                  y="84"
                  textAnchor="middle"
                  fontSize="26"
                  letterSpacing="1"
                  textLength="210"
                  lengthAdjust="spacingAndGlyphs"
                >
                  WE&rsquo;RE GOING TO
                </text>
                <text
                  className="stamp-text"
                  x="160"
                  y="150"
                  textAnchor="middle"
                  fontSize="52"
                  letterSpacing="1"
                  textLength="244"
                  lengthAdjust="spacingAndGlyphs"
                >
                  SAN DIEGO
                </text>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
