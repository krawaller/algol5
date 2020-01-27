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
  toBattleControls: () => void;
  toBattleLobby: () => void;
  navTo: (path: string) => void;
  forkSession: () => void;
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
  return (
    <div className={css.battleHistoryContainer}>
      <Stepper max={frameCount} current={frame} onChange={actions.toFrame} />
      <Content content={content} />
      <div className={css.battleHistoryButtons}>
        <Button
          onClick={actions.forkSession}
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
        {/* {!battleFinished && (
        <Button onClick={actions.toBattleControls}>Continue playing</Button>
      )}
      <Button onClick={actions.toBattleLobby}>Session info</Button> */}
      </div>
    </div>
  );
};
