export * from "./BattleControls";
import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";

type BattleControlsProps = {
  ui: AlgolBattleUI;
  callback: (
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => void;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  ui,
  callback,
}) => (
  <React.Fragment>
    <Content content={ui.instruction} callback={callback} />
    {ui.undo && (
      <div>
        <button onClick={() => callback("undo")}>Undo {ui.undo}</button>
      </div>
    )}
  </React.Fragment>
);
