export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolBattleUI } from "../../../../types";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

export interface BattleControlsActions {
  undoBattleCommand: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
}

type BattleControlsProps = {
  ui: AlgolBattleUI;
  actions: BattleControlsActions;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  ui,
  actions,
}) => {
  return (
    <Fragment>
      <ButtonGroup>
        <Button
          disabled={!Boolean(ui.undo)}
          onClick={actions.undoBattleCommand}
        >
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
      </ButtonGroup>
    </Fragment>
  );
};
