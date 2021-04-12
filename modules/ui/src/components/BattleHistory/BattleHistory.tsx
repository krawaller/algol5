import React, { FunctionComponent } from "react";
import { AlgolContentAnon, AlgolBattle } from "../../../../types";
import { Content } from "../Content";
import { Stepper } from "../Stepper";

import css from "./BattleHistory.cssProxy";
import { Button } from "../Button";
import { BoardPageContent } from "../BoardPageContent";
import { useAppActions, useLocalBattleActions } from "../../contexts";

type BattleHistoryProps = {
  content: AlgolContentAnon;
  frame: number;
  toFrame: (frame: number) => void;
  battle: AlgolBattle;
};

export const BattleHistory: FunctionComponent<BattleHistoryProps> = props => {
  const { content, frame, toFrame, battle } = props;
  const frameCount = battle.history.length - 1;
  const historyFrame = battle.history[frame];
  const { forkBattleFrame } = useLocalBattleActions();
  const { reportError } = useAppActions();

  if (frameCount === 0) {
    return (
      <div className={css.battleHistoryContainer}>
        After the first turn you will be able to replay the battle history here!
      </div>
    );
  }
  return (
    <BoardPageContent title={"Session history"}>
      <div className={css.battleHistoryContainer}>
        <Stepper max={frameCount} current={frame} onChange={toFrame} />
        <Content content={content} />
        <p>
          You can{" "}
          <Button
            onClick={() => {
              if (
                confirm(
                  "Do you create a copy of this session from this point in the history, and switch to the new session?"
                )
              ) {
                forkBattleFrame(battle, frame);
              }
            }}
            onError={reportError}
            controlId="fork-history-frame-button"
            disabled={
              battle.gameEndedBy && frame === frameCount
                ? "Cannot fork a finished battle!"
                : frame === 0 ||
                  (historyFrame.turn === 1 && historyFrame.player === 1)
                ? "Cannot fork the beginning of a battle"
                : false
            }
          >
            fork
          </Button>{" "}
          a new session from this point.
        </p>
      </div>
    </BoardPageContent>
  );
};
