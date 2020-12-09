import React, { FunctionComponent } from "react";
import css from "./BattleHelp.cssProxy";
import { AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";

export type BattleHelpActions = {
  navTo: (path: string) => void;
  undoBattleCommand: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
};

type BattleHelpProps = {
  actions: BattleHelpActions;
  instruction: AlgolContentAnon;
};

export const BattleHelp: FunctionComponent<BattleHelpProps> = props => {
  const { actions, instruction } = props;
  return (
    <>
      <div className={css.battleHelpContentContainer}>
        <Content content={instruction} actions={actions} />
      </div>
    </>
  );
};
