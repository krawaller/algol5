export * from "./BattleControls";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolContentAnon, AlgolMeta } from "../../../../types";

import { Content } from "../Content";
import { Breadcrumbs } from "../Breadcrumbs";

export interface BattleControlsActions {
  undo: () => void;
  leaveBattle: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  seeHistory: () => void;
  navTo: (path: string) => void;
}

type BattleControlsProps = {
  instruction: AlgolContentAnon;
  undo: string | null;
  actions: BattleControlsActions;
  haveHistory?: boolean;
  turnNumber: number;
  player: 0 | 1 | 2;
  meta: AlgolMeta<string, string>;
};

export const BattleControls: FunctionComponent<BattleControlsProps> = ({
  instruction,
  undo,
  actions,
  haveHistory,
  turnNumber,
  player,
  meta,
}) => {
  const headline: AlgolContentAnon = {
    line: [{ text: `turn ${turnNumber}, ` }, { player }],
  };
  return (
    <Fragment>
      <Breadcrumbs
        actions={actions}
        crumbs={[
          { content: meta.name, onClick: actions.leaveBattle },
          { content: "local" },
          { content: <Content content={headline} /> },
        ]}
      />
      <Content content={instruction} actions={actions} />
      {undo && (
        <div>
          <button onClick={actions.undo}>Undo {undo}</button>
        </div>
      )}
      <hr />
      <button onClick={actions.leaveBattle}>Leave battle</button>
      &nbsp;
      <button disabled={!haveHistory} onClick={actions.seeHistory}>
        See history
      </button>
    </Fragment>
  );
};
