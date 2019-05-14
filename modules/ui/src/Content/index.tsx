import * as React from "react";
import {
  AlgolContentAnon,
  isAlgolContentLine,
  isAlgolContentText,
  isAlgolContentCmnd,
  isAlgolContentUnitType,
  isAlgolContentPos,
  isAlgolContentUnit,
  isAlgolContentSelect,
  isAlgolContentPlayer
} from "../../../types";

import { Icon } from "../Icon";

type ContentProps = {
  /** The content to show */
  content: AlgolContentAnon;
  /** The callback to use for button clicks */
  callback: (action: string) => void;
};

const posStyles = {
  backgroundColor: "#EEE",
  padding: "3px",
  border: "1px solid black",
  whiteSpace: "nowrap"
} as const;

/**
 * Displays some AlgolContent
 */
export const Content: React.FunctionComponent<ContentProps> = ({
  content,
  callback
}) => {
  if (isAlgolContentLine(content)) {
    return (
      <div
        style={{
          lineHeight: "2em"
          // display: "flex",
          // alignItems: "center",
          // whiteSpace: "pre-wrap"
        }}
      >
        {content.line.map((c, n) => (
          <Content key={n} content={c} callback={callback} />
        ))}
      </div>
    );
  }
  if (isAlgolContentText(content)) {
    return <span>content.text</span>;
  }
  if (isAlgolContentSelect(content)) {
    return <span className="selectInstruction">{content.select}</span>;
  }
  if (isAlgolContentCmnd(content)) {
    return (
      <button onClick={() => callback(content.command)}>
        {content.command}
      </button>
    );
  }
  if (isAlgolContentUnitType(content)) {
    const [icon, owner] = content.unittype;
    return (
      <span style={{ display: "inline-block", width: "2em" }}>
        <Icon owner={owner} icon={icon} />
      </span>
    );
  }
  if (isAlgolContentPos(content)) {
    const { pos } = content;
    return <span style={posStyles}>{pos}</span>;
  }
  if (isAlgolContentUnit(content)) {
    const [icon, owner, pos] = content.unit;
    return (
      <span style={posStyles}>
        {pos}{" "}
        <Content callback={callback} content={{ unittype: [icon, owner] }} />
      </span>
    );
  }
  if (isAlgolContentPlayer(content)) {
    const { player } = content;
    if (player === 1) {
      return <span style={{ fontWeight: "bold", color: "red" }}>Player 1</span>;
    }
    return <span style={{ fontWeight: "bold", color: "blue" }}>Player 2</span>;
  }
  return null;
};
