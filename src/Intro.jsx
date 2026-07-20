export default function Intro({ onStart }) {
  return (
    <div className="screen intro">
      <h1 className="intro-title">
        Pick your favorite things and we&rsquo;ll tell you what kind of walrus
        you are.
      </h1>

      {/* DROP COUPLE'S PHOTO HERE
          <img src="./assets/us.jpg" alt="Us" className="intro-photo" /> */}
      <div className="intro-photo-placeholder" aria-hidden="true">
        INSERT PHOTO HERE
      </div>

      <button className="start-btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  );
}
