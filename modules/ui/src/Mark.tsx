import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { positionStyles, glitz } from "./helpers";

const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
  <circle cx='25' cy='25' r='21' stroke-width='6' stroke='white' fill='none'>
  </circle>
</svg>
`
  .replace(/\n/g, "")
  .replace(/ +/g, " ")
  .replace(/> </g, "><");

const potentialCSS = glitz.injectStyle({
  opacity: 0.4,
  ":hover": {
    opacity: 0.8
  }
});

const pulsateCSS = glitz.injectStyle({
  animationDuration: "0.8s",
  animationTimingFunction: "ease",
  animationIterationCount: "infinite",
  animation: {
    name: {
      "0%": {
        transform: "scale(1, 1)"
      },
      "25%": {
        transform: "scale(0.9, 0.9)"
      },
      "50%": {
        transform: "scale(1, 1)"
      },
      "75%": {
        transform: "scale(1.1, 1.1)"
      },
      "100%": {
        transform: "scale(1, 1)"
      }
    }
  }
});

const markCSS = glitz.injectStyle({
  cursor: "pointer",
  background: `url("data:image/svg+xml;utf8,${svg}")`
});

type MarkProps = {
  /** Height of board */
  height: number;
  /** Width of board */
  width: number;
  /** Whether or not the mark is potential (or selected) */
  potential: boolean;
  /** The position of the mark (will be passed to callback) */
  pos: string;
  /** Whether there is a piece on the same spot */
  piece?: boolean;
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
  width,
  piece
}) => {
  const handleClick = useCallback(() => callback(pos), [pos]);

  return (
    <div
      onClick={handleClick}
      className={classnames(markCSS, {
        [potentialCSS]: potential,
        [pulsateCSS]: potential && !piece
      })}
      style={positionStyles({ height, width, pos })}
    />
  );
};
