export default function Intro({ onStart }) {
  return (
    <div className="screen intro">
      <h1 className="intro-title">Where Are We Going?</h1>
      <p className="intro-subtitle">
        Answer a few questions and find out where your next adventure takes you.
      </p>

      {/* DROP COUPLE'S PHOTO HERE
          <img src="./assets/us.jpg" alt="Us" className="intro-photo" /> */}
      <div className="intro-photo-placeholder" aria-hidden="true" />

      <button className="start-btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
}
