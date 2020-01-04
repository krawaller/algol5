export * from "./BattleControls";
import React, { FunctionComponent } from "react";
import { AlgolContentAnon } from "../../../../types";

import { Content } from "../Content";

export interface BattleControlsActions {
  undo: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
}

type BattleControlsProps = {
  instruction: AlgolContentAnon;
  undo: string | null;
  actions: BattleControlsActions;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  instruction,
  undo,
  actions,
}) => (
  <React.Fragment>
    <Content content={instruction} actions={actions} />
    {undo && (
      <div>
        <button onClick={actions.undo}>Undo {undo}</button>
      </div>
    )}
  </React.Fragment>
);
