import React, { FunctionComponent } from "react";
import { AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";
import { Stepper } from "../Stepper";

import css from "./BattleHistory.cssProxy";
import { Button } from "../Button";

interface BattleHistoryActions {
  toFrame: (frame: number) => void;
  toBattleControls: () => void;
  toBattleLobby: () => void;
  navTo: (path: string) => void;
  fork: () => void;
}

type BattleHistoryProps = {
  content: AlgolContentAnon;
  frame: number;
  frameCount: number;
  actions: BattleHistoryActions;
  battleFinished: boolean;
};

export const BattleHistory: FunctionComponent<BattleHistoryProps> = props => {
  const { content, frame, frameCount, actions, battleFinished } = props;
  return (
    <div className={css.battleHistoryContainer}>
      <Stepper max={frameCount} current={frame} onChange={actions.toFrame} />
      <Content content={content} />
      <div className={css.battleHistoryButtons}>
        <Button
          onClick={actions.fork}
          disabled={
            battleFinished && frame === frameCount
              ? "Cannot fork a finished battle!"
              : frame === 0
              ? "Cannot fork the beginning of a battle"
              : false
          }
        >
          Fork from here
        </Button>
        {/* {!battleFinished && (
        <Button onClick={actions.toBattleControls}>Continue playing</Button>
      )}
      <Button onClick={actions.toBattleLobby}>Session info</Button> */}
      </div>
    </div>
  );
};
