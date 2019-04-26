import React, { useCallback } from "react";

type MarkProps = {
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
  callback
}) => {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>
    <circle cx='25' cy='25' r='21' stroke-width='6' stroke='white' fill='none' stroke-opacity='${
      potential ? 0.5 : 1
    }'>
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
  </svg>
  `
    .replace(/\n/g, "")
    .replace(/ +/g, " ")
    .replace(/> </g, "><");
  const clickHandler = useCallback(() => callback(pos), [pos]);
  return (
    <div
      onClick={clickHandler}
      style={{
        height: "100%",
        width: "100%",
        cursor: "pointer",
        background: `url("data:image/svg+xml;utf8,${svg}")`
      }}
    />
  );
};
