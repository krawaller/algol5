export * from "./BattleMove";
import React, { FunctionComponent, useState } from "react";
import { AlgolBattleUI } from "../../../../types";
import { Button } from "../Button";
import css from "./BattleMove.cssProxy";
import { BattleHelp } from "../BattleHelp";
import { BattleControls } from "../BattleControls";

export interface BattleMoveActions {
  undoBattleCommand: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  navTo: (url: string) => void;
}

export interface BattleMoveContent {
  rules: {
    html: string;
    updated: string;
  };
}

type BattleMoveProps = {
  ui: AlgolBattleUI;
  actions: BattleMoveActions;
  content: BattleMoveContent;
};

export const BattleMove: FunctionComponent<BattleMoveProps> = props => {
  const { ui, content, actions } = props;
  const [showHelp, setShowHelp] = useState(false);
  return (
    <>
      {showHelp ? (
        <BattleHelp
          actions={actions}
          content={content}
          instruction={ui.instruction}
        />
      ) : (
        <BattleControls actions={actions} ui={ui} />
      )}
      <div className={css.battleMoveHelpButton}>
        <Button
          big
          text="?"
          active={showHelp}
          onClick={() => setShowHelp(!showHelp)}
        />
      </div>
    </>
  );
};
