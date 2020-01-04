export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolContentAnon } from "../../../../types";

import { Content } from "../Content";

export interface BattleControlsActions {
  undo: () => void;
  leaveBattle: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  seeHistory: () => void;
}

type BattleControlsProps = {
  instruction: AlgolContentAnon;
  undo: string | null;
  actions: BattleControlsActions;
  haveHistory?: boolean;
  turnNumber: number;
  player: 0 | 1 | 2;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  instruction,
  undo,
  actions,
  haveHistory,
  turnNumber,
  player,
}) => {
  const headline: AlgolContentAnon = {
    line: [{ text: `Turn ${turnNumber} - ` }, { player }, { text: ": " }],
  };
  return (
    <Fragment>
      <Content content={headline} />
      <Content content={instruction} actions={actions} />
      {undo && (
        <div>
          <button onClick={actions.undo}>Undo {undo}</button>
        </div>
      )}
      <hr />
      <button onClick={actions.leaveBattle}>Leave battle</button>
      &nbsp;
      <button disabled={!haveHistory} onClick={actions.seeHistory}>
        See history
      </button>
    </Fragment>
  );
};
