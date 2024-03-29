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
import { Button } from "../Button";
import { useBattleActionsAndState } from "../GamePage/GamePage.useBattleActionsAndState";
import { useGameAPI } from "../../contexts";

type ContentActions = {
  endTurn: () => void;
  command: (cmnd: string) => void;
};

type ContentProps = {
  content: AlgolContentAnon;
  actions?: ContentActions;
};

const noopActions: ContentActions = {
  endTurn: () => {},
  command: () => {},
};

/**
 * Displays some AlgolContent
 */
export const Content: React.FunctionComponent<ContentProps> = ({
  content,
  actions = noopActions,
}) => {
  const api = useGameAPI();
  const [{ session }] = useBattleActionsAndState(api);
  if (!content) return null;
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
      <Button
        onClick={() => actions.command(content.command)}
        controlId={`content-command-${content.command}-button`}
      >
        {content.command}
      </Button>
    );
  }
  if (isAlgolContentEndTurn(content)) {
    return (
      <Button onClick={actions.endTurn} controlId="content-end-turn-button">
        {content.endTurn}
      </Button>
    );
  }
  if (isAlgolContentBold(content)) {
    return <strong>{content.bold}</strong>;
  }
  if (isAlgolContentUnitType(content)) {
    const [icon, owner] = content.unittype;
    return (
      <span className={css.contentUnitType}>
        <Icon owner={owner as 0 | 1 | 2} icon={icon} />
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
          {session?.participants[1].name ?? "Player 1"}
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
        {session?.participants[2].name ?? "Player 2"}
      </span>
    );
  }
  return null;
};
