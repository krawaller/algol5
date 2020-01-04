import React from "react";
import classNames from "classnames";
import css from "./Content.cssProxy";
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
  content: AlgolContentAnon;
  actions?: ContentActions;
};

const noopActions: ContentActions = {
  endTurn: () => {},
  command: (cmnd: string) => {},
};

/**
 * Displays some AlgolContent
 */
export const Content: React.FunctionComponent<ContentProps> = ({
  content,
  actions = noopActions,
}) => {
  if (isAlgolContentLine(content)) {
    return (
      <span className={css.contentLine}>
        {content.line.map(c => (
          <Content key={Math.random()} content={c} actions={actions} />
        ))}
      </span>
    );
  }
  if (isAlgolContentText(content)) {
    return <span>{content.text}</span>;
  }
  if (isAlgolContentSelect(content)) {
    return (
      <span className={css.contentSelectInstruction}>{content.select}</span>
    );
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
      <span className={css.contentUnitType}>
        <Icon owner={owner} icon={icon} />
      </span>
    );
  }
  if (isAlgolContentPos(content)) {
    const { pos } = content;
    return <span className={css.contentPosition}>{pos}</span>;
  }
  if (isAlgolContentUnit(content)) {
    const [icon, owner, pos] = content.unit;
    return (
      <span className={css.contentPosition}>
        {pos}{" "}
        <Content actions={actions} content={{ unittype: [icon, owner] }} />
      </span>
    );
  }
  if (isAlgolContentPlayer(content)) {
    const { player } = content;
    if (player === 1) {
      return (
        <span className={classNames(css.contentPlayer, css.contentPlayer1)}>
          Player 1
        </span>
      );
    } else if (player === 0) {
      return (
        <span className={classNames(css.contentPlayer, css.contentPlayer0)}>
          Player 0
        </span>
      );
    }
    return (
      <span className={classNames(css.contentPlayer, css.contentPlayer2)}>
        Player 2
      </span>
    );
  }
  return null;
};
