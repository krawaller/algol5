import React, { useCallback, useState } from "react";
import { positionStyles } from "./helpers";

type MarkProps = {
  /** Height of board */
  height: number;
  /** Width of board */
  width: number;
  /** Whether or not the mark is potential (or selected) */
  potential: boolean;
  /** The position of the mark (will be passed to callback) */
  pos: string;
  /** Callback to use when user clicks mark */
  callback: (pos: string) => void;
};

/**
 * Shows a mark or a potential mark on the board.
 */
export const Mark: React.FunctionComponent<MarkProps> = ({
  potential,
  pos,
  callback,
  height,
  width
}) => {
  const [hover, setHover] = useState(false);
  const handleClick = useCallback(() => callback(pos), [pos]);
  const handleEnter = useCallback(() => setHover(true), []);
  const handleLeave = useCallback(() => setHover(false), []);
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
    <g stroke-opacity='${potential ? (hover ? 0.8 : 0.5) : hover ? 1 : 0.85}'>
      <circle cx='25' cy='25' r='21' stroke-width='6' stroke='white' fill='none'>
      ${
        potential
          ? `
      <animate
      attributeType='XML'
      attributeName='r'
      values='21;20;16;15;16;20;21'
      dur='0.8s'
      begin='0s'
      repeatCount='indefinite'/>
      `
          : ""
      }
      </circle>
    </g>
  </svg>
  `
    .replace(/\n/g, "")
    .replace(/ +/g, " ")
    .replace(/> </g, "><");
  return (
    <div
      onClick={handleClick}
      onMouseOver={handleEnter}
      onMouseOut={handleLeave}
      style={{
        ...positionStyles({ height, width, pos }),
        cursor: "pointer",
        background: `url("data:image/svg+xml;utf8,${svg}")`
      }}
    />
  );
};
