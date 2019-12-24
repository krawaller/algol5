import React, { FunctionComponent } from "react";
import { AlgolBattleUI } from "../../../types";

import { Content } from "../Content";
import { Stepper } from "../Stepper";
import css from "./BattleHeadline.css.js";

type BattleHeadlineProps = {
  ui: AlgolBattleUI;
  onChooseFrame: (num: number) => void;
  currentFrame: number;
  frameCount: number;
};

const noop = () => {};

export const BattleHeadline: FunctionComponent<BattleHeadlineProps> = ({
  ui,
  onChooseFrame,
  frameCount,
  currentFrame,
}) => (
  <div className={css.battleHeadlineContainer}>
    <Content
      content={{
        line: [
          { text: `Turn ${ui.turnNumber} - ` },
          { player: ui.player as 0 | 1 | 2 },
        ],
      }}
      callback={noop}
    />
    <Stepper max={frameCount} current={currentFrame} onChange={onChooseFrame} />
  </div>
);
