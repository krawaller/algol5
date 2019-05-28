import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "algol-types";

import { BattleUIHeadline } from "./BattleUIHeadline";
import { BattleUIControls } from "./BattleUIControls";

type BattleUIProps = {
  ui: AlgolBattleUI;
  callback: (
    action: "mark" | "command" | "endTurn" | "undo",
    arg?: string
  ) => void;
};

export const BattleUI: FunctionComponent<BattleUIProps> = ({
  ui,
  callback
}) => (
  <React.Fragment>
    <BattleUIHeadline ui={ui} callback={callback} />
    <BattleUIControls ui={ui} callback={callback} />
  </React.Fragment>
);
