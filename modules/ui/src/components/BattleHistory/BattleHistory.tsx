import React, { FunctionComponent, Fragment } from "react";
import { AlgolContentAnon, AlgolMeta } from "../../../../types";
import { Content } from "../Content";
import { Stepper } from "../Stepper";

import css from "./BattleHistory.cssProxy";
import { Breadcrumbs } from "../Breadcrumbs";

interface BattleHistoryActions {
  toFrame: (frame: number) => void;
  leaveBattle: () => void;
  leaveHistory: () => void;
  navTo: (path: string) => void;
}

type BattleHistoryProps = {
  content: AlgolContentAnon;
  frame: number;
  frameCount: number;
  actions: BattleHistoryActions;
  battleFinished: boolean;
  meta: AlgolMeta<string, string>;
};

export const BattleHistory: FunctionComponent<BattleHistoryProps> = props => {
  const { content, frame, frameCount, actions, battleFinished, meta } = props;
  return (
    <Fragment>
      <Breadcrumbs
        actions={actions}
        crumbs={[
          { content: meta.name, onClick: actions.leaveBattle },
          { content: "local" },
          { content: battleFinished ? "finished" : "history" },
        ]}
      />
      <div className={css.battleHistoryContainer}>
        <Stepper max={frameCount} current={frame} onChange={actions.toFrame} />
        <Content content={content} />
        <br />
        {battleFinished ? (
          <button onClick={actions.leaveBattle}>Leave battle</button>
        ) : (
          <button onClick={actions.leaveHistory}>Back to battle</button>
        )}
      </div>
    </Fragment>
  );
};
