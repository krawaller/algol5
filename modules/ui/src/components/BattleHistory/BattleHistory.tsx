import React, { FunctionComponent } from "react";
import {
  AlgolContentAnon,
  AlgolBattle,
  AlgolErrorReporter,
} from "../../../../types";
import { Content } from "../Content";
import { Stepper } from "../Stepper";

import css from "./BattleHistory.cssProxy";
import { Button } from "../Button";

interface BattleHistoryActions {
  toFrame: (frame: number) => void;
  forkBattleFrame: (battle: AlgolBattle, frame: number) => void;
  reportError: AlgolErrorReporter;
}

type BattleHistoryProps = {
  content: AlgolContentAnon;
  frame: number;
  actions: BattleHistoryActions;
  battle: AlgolBattle;
};

export const BattleHistory: FunctionComponent<BattleHistoryProps> = props => {
  const { content, frame, actions, battle } = props;
  const frameCount = battle.history.length - 1;
  const historyFrame = battle.history[frame];
  if (frameCount === 0) {
    return (
      <div className={css.battleHistoryContainer}>
        After the first turn you will be able to replay the battle history here!
      </div>
    );
  }
  return (
    <div className={css.battleHistoryContainer}>
      <Stepper max={frameCount} current={frame} onChange={actions.toFrame} />
      <Content content={content} />
      <div className={css.battleHistoryButtons}>
        <Button
          onClick={() => {
            if (
              confirm(
                "Do you create a copy of this session from this point in the history, and switch to the new session?"
              )
            ) {
              actions.forkBattleFrame(battle, frame);
            }
          }}
          onError={actions.reportError}
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
          Fork from this turn
        </Button>
      </div>
    </div>
  );
};
