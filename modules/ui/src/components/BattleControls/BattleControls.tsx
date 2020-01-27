export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolBattleUI, AlgolErrorReporter } from "../../../../types";
import { Content } from "../Content";
import css from "./BattleControls.cssProxy";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

export interface BattleControlsActions {
  undo: () => void;
  toBattleLobby: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  toHistory: () => void;
  navTo: (path: string) => void;
  error: AlgolErrorReporter;
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
      <ButtonGroup>
        <Button disabled={!Boolean(ui.undo)} onClick={actions.undo}>
          Undo
        </Button>
        {Object.entries(ui.commands).map(([cmnd, info]) => (
          <Button
            disabled={!info.available}
            onClick={() => actions.command(cmnd)}
            key={cmnd}
          >
            {cmnd}
          </Button>
        ))}
        <Button
          big
          disabled={!Boolean(ui.endTurn) || ui.winner !== undefined}
          onClick={actions.endTurn}
        >
          End turn
        </Button>
        {/* <Button disabled={!haveHistory} onClick={actions.toHistory}>
          History
        </Button>
        <Button onClick={actions.toBattleLobby}>Session info</Button> */}
      </ButtonGroup>
      <div className={css.battleControlHint}>
        <Content content={ui.instruction} actions={actions} />
      </div>
    </Fragment>
  );
};
