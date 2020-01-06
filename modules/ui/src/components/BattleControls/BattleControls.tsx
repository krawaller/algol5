export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolBattleUI } from "../../../../types";
import { Content } from "../Content";
import css from "./BattleControls.cssProxy";

export interface BattleControlsActions {
  undo: () => void;
  toBattleLobby: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  toHistory: () => void;
  navTo: (path: string) => void;
}

type BattleControlsProps = {
  ui: AlgolBattleUI;
  actions: BattleControlsActions;
  haveHistory?: boolean;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  ui,
  actions,
  haveHistory,
}) => {
  return (
    <Fragment>
      <div className={css.battleControlPanel}>
        <button disabled={!Boolean(ui.undo)} onClick={actions.undo}>
          Undo
        </button>
        {Object.entries(ui.commands).map(([cmnd, info]) => (
          <button
            disabled={!info.available}
            onClick={() => actions.command(cmnd)}
            key={cmnd}
          >
            {cmnd}
          </button>
        ))}
        <button
          disabled={!Boolean(ui.endTurn) || ui.winner !== undefined}
          onClick={actions.endTurn}
        >
          End turn
        </button>
        <button disabled={!haveHistory} onClick={actions.toHistory}>
          History
        </button>
        <button onClick={actions.toBattleLobby}>Session info</button>
      </div>
      <Content content={ui.instruction} actions={actions} />
    </Fragment>
  );
};
