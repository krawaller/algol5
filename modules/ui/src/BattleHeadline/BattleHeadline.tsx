import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";

type BattleHeadlineProps = {
  ui: AlgolBattleUI;
  onChooseFrame: (num: number) => void;
};

const noop = () => {};

export const BattleHeadline: FunctionComponent<BattleHeadlineProps> = ({
  ui,
  onChooseFrame,
}) => (
  <div>
    <Content
      content={{
        line: [
          { text: `Turn ${ui.turnNumber} - ` },
          { player: ui.player as 1 | 2 },
        ],
      }}
      callback={noop}
    />
  </div>
);
