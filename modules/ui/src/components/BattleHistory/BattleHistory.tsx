import React, { FunctionComponent } from "react";
import { AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";
import { Stepper } from "../Stepper";

import css from "./BattleHistory.cssProxy";

interface BattleHistoryActions {
  toFrame: (frame: number) => void;
  toGameLobby: () => void;
  toBattleControls: () => void;
  navTo: (path: string) => void;
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
      <br />
      {battleFinished ? (
        <button onClick={actions.toGameLobby}>Leave battle</button>
      ) : (
        <button onClick={actions.toBattleControls}>Back to battle</button>
      )}
    </div>
  );
};
