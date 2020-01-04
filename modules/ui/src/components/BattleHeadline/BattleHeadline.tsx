import React, { FunctionComponent } from "react";
import { AlgolBattleUI, AlgolContentAnon } from "../../../../types";

import { Content } from "../Content";
import { Stepper } from "../Stepper";
import css from "./BattleHeadline.cssProxy";

type BattleHeadlineProps = {
  ui: AlgolBattleUI;
  onChooseFrame: (num: number) => void;
  currentFrame: number;
  frameCount: number;
  content?: AlgolContentAnon;
};

export const BattleHeadline: FunctionComponent<BattleHeadlineProps> = ({
  ui,
  onChooseFrame,
  frameCount,
  currentFrame,
  content,
}) => (
  <div className={css.battleHeadlineContainer}>
    <span className={css.battleHeadlineTurn}>
      <Content
        content={
          content ||
          (ui.turnNumber
            ? {
                line: [
                  { text: `Turn ${ui.turnNumber} - ` },
                  { player: ui.player as 0 | 1 | 2 },
                ],
              }
            : { line: [{ text: "Start" }] })
        }
      />
    </span>
    <span className={css.battleHeadlineSlider}>
      {frameCount > 1 && (
        <Stepper
          max={frameCount}
          current={currentFrame}
          onChange={onChooseFrame}
        />
      )}
    </span>
  </div>
);
