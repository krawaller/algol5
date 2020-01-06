export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolContentAnon, AlgolMeta } from "../../../../types";

import { Content } from "../Content";

export interface BattleControlsActions {
  undo: () => void;
  toGameLobby: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  toHistory: () => void;
  navTo: (path: string) => void;
}

type BattleControlsProps = {
  instruction: AlgolContentAnon;
  undo: string | null;
  actions: BattleControlsActions;
  haveHistory?: boolean;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  instruction,
  undo,
  actions,
  haveHistory,
}) => {
  return (
    <Fragment>
      <Content content={instruction} actions={actions} />
      {undo && (
        <div>
          <button onClick={actions.undo}>Undo {undo}</button>
        </div>
      )}
      <hr />
      <button onClick={actions.toGameLobby}>Leave battle</button>
      &nbsp;
      <button disabled={!haveHistory} onClick={actions.toHistory}>
        See history
      </button>
    </Fragment>
  );
};
