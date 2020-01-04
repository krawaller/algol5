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
  isAlgolContentPlayer,
  isAlgolContentEndTurn,
  isAlgolContentBold,
} from "../../../../types";

import { Icon } from "../Icon";

interface ContentActions {
  endTurn: () => void;
  command: (cmnd: string) => void;
}

type ContentProps = {
  /** The content to show */
  content: AlgolContentAnon;
  /** The callback to use for button clicks */
  actions?: ContentActions;
};

const noopActions: ContentActions = {
  endTurn: () => {},
  command: (cmnd: string) => {},
};

const posStyles = {
  backgroundColor: "#EEE",
  padding: "3px",
  border: "1px solid black",
  whiteSpace: "nowrap",
} as const;

/**
 * Displays some AlgolContent
 */
export const Content: React.FunctionComponent<ContentProps> = ({
  content,
  actions = noopActions,
}) => {
  if (isAlgolContentLine(content)) {
    return (
      <div
        style={{
          lineHeight: "2em",
          // display: "flex",
          // alignItems: "center",
          // whiteSpace: "pre-wrap"
        }}
      >
        {content.line.map(c => (
          <Content key={Math.random()} content={c} actions={actions} />
        ))}
      </div>
    );
  }
  if (isAlgolContentText(content)) {
    return <span>{content.text}</span>;
  }
  if (isAlgolContentSelect(content)) {
    return <span className="selectInstruction">{content.select}</span>;
  }
  if (isAlgolContentCmnd(content)) {
    return (
      <button onClick={() => actions.command(content.command)}>
        {content.command}
      </button>
    );
  }
  if (isAlgolContentEndTurn(content)) {
    return <button onClick={actions.endTurn}>{content.endTurn}</button>;
  }
  if (isAlgolContentBold(content)) {
    return <strong>{content.bold}</strong>;
  }
  if (isAlgolContentUnitType(content)) {
    const [icon, owner] = content.unittype;
    return (
      <span style={{ display: "inline-block", width: "2em", height: "2em" }}>
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
        <Content actions={actions} content={{ unittype: [icon, owner] }} />
      </span>
    );
  }
  if (isAlgolContentPlayer(content)) {
    const { player } = content;
    if (player === 1) {
      return <span style={{ fontWeight: "bold", color: "red" }}>Player 1</span>;
    } else if (player === 0) {
      return (
        <span style={{ fontWeight: "bold", color: "gold" }}>Player 0</span>
      );
    }
    return <span style={{ fontWeight: "bold", color: "blue" }}>Player 2</span>;
  }
  return null;
};
