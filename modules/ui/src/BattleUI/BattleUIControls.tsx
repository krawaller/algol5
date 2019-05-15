import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";

type BattleUIControlsProps = {
  ui: AlgolBattleUI;
  callback: (action: string) => void;
};

export const BattleUIControls: FunctionComponent<BattleUIControlsProps> = ({
  ui,
  callback
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
