import * as React from "react";
import {
  AlgolContentAnon,
  isAlgolContentLine,
  isAlgolContentText,
  isAlgolContentCmnd,
  isAlgolContentUnitType,
  isAlgolContentPos,
  isAlgolContentUnit
} from "../../types";

import { Icon } from "./Icon";

type ContentProps = {
  /** The content to show */
  content: AlgolContentAnon;
  /** The callback to use for button clicks */
  callback: (action: string) => void;
};

/**
 * Displays some AlgolContent
 */
export const Content: React.FunctionComponent<ContentProps> = ({
  content,
  callback
}) => {
  if (isAlgolContentLine(content)) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {content.line.map((c, n) => (
          <Content key={n} content={c} callback={callback} />
        ))}
      </div>
    );
  }
  if (isAlgolContentText(content)) {
    return content.text;
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
    return pos; // TODO - nice styling? meh, very rarely used, i think
  }
  if (isAlgolContentUnit(content)) {
    const [icon, owner, pos] = content.unit;
    return [
      "the ",
      <Content callback={callback} content={{ pos }} />,
      <Content callback={callback} content={{ unittype: [icon, owner] }} />
    ];
  }
  return null;
};
