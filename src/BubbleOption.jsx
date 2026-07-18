import { useEffect, useRef } from "react";
import rough from "roughjs";

export default function BubbleOption({
  text,
  onSelect,
  selected,
  disabled,
  prefilled = false, // show the fill instantly (reveal sheet), no animation
}) {
  const svgRef = useRef(null);

  // Draw / clear the bubbled-in scribble fill when selection changes.
  const filled = selected || prefilled;
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const existing = svg.querySelector(".bubble-fill");
    if (existing) existing.remove();
    if (!filled) return;

    const rc = rough.svg(svg);
    const fill = rc.circle(16, 16, 19, {
      roughness: 2.4,
      stroke: "#3a3a3a",
      strokeWidth: 1.4,
      fill: "#3a3a3a",
      fillStyle: "zigzag",
      fillWeight: 2.2,
      hachureGap: 2.6,
    });
    fill.setAttribute("class", prefilled ? "bubble-fill instant" : "bubble-fill");
    svg.appendChild(fill);
  }, [filled, prefilled]);

  return (
    <div
      className={`option-row${selected ? " selected" : ""}${disabled ? " disabled" : ""}`}
      onClick={disabled ? undefined : onSelect}
    >
      {/* Clean outline; the rough scribble fill is layered in on select */}
      <svg ref={svgRef} className="bubble-svg" width="32" height="32">
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
      </svg>
      <span className="option-text">{text}</span>
    </div>
  );
}
