import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";

type BattleUIHeadlineProps = {
  ui: AlgolBattleUI;
  callback: (action: "mark" | "command" | "endTurn" | "undo") => void;
};

// TODO - nice game title from meta (in UI?)
// title when game is over
export const BattleUIHeadline: FunctionComponent<BattleUIHeadlineProps> = ({
  ui,
  callback,
}) => (
  <div>
    <Content
      content={{
        line: [
          { text: `Turn ${ui.turnNumber} - ` },
          { player: ui.player as 1 | 2 },
        ],
      }}
      callback={() => {}}
    />
  </div>
);
