export * from "./BattleControls";
import React, { FunctionComponent } from "react";
import { AlgolContentAnon } from "../../../types";

import { Content } from "../Content";

type BattleControlsProps = {
  instruction: AlgolContentAnon;
  undo: string | null;
  callback: (
    action: "endTurn" | "undo" | "mark" | "command",
    arg?: string
  ) => void;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  instruction,
  undo,
  callback,
}) => (
  <React.Fragment>
    <Content content={instruction} callback={callback} />
    {undo && (
      <div>
        <button onClick={() => callback("undo")}>Undo {undo}</button>
      </div>
    )}
  </React.Fragment>
);
