import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";

type BattleUIHeadlineProps = {
  ui: AlgolBattleUI;
  callback: (action: string) => void;
};

// TODO - nice game title from meta (in UI?)
// title when game is over
export const BattleUIHeadline: FunctionComponent<BattleUIHeadlineProps> = ({
  ui,
  callback
}) => (
  <div>
    <Content
      content={{
        line: [
          { text: `${ui.gameId} - Turn ${ui.turnNumber} - ` },
          { player: ui.player as 1 | 2 }
        ]
      }}
      callback={() => {}}
    />
  </div>
);
