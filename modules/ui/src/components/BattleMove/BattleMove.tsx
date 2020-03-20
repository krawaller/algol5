export * from "./BattleMove";
import React, { FunctionComponent, useState } from "react";
import { AlgolBattleUI } from "../../../../types";
import { Button } from "../Button";
import css from "./BattleMove.cssProxy";
import { BattleHelp } from "../BattleHelp";
import { BattleControls } from "../BattleControls";
import { Switch } from "../Switch";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";

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
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  return (
    <>
      {showHelp ? (
        <BattleHelp actions={actions} instruction={ui.instruction} />
      ) : (
        <BattleControls actions={actions} ui={ui} />
      )}
      <div className={css.battleMoveHelpButton}>
        <Button>
          <Switch
            text="Verbose"
            flipped={showHelp}
            onFlip={() => setShowHelp(!showHelp)}
          />
        </Button>
      </div>
      <div className={css.battleMoveRulesButton}>
        <Button onClick={openRulesModal}>See full rules</Button>
      </div>
      <Modal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        title={"How to play"}
        subtitle={`updated ${content.rules.updated}`}
      >
        <Markdown actions={actions} html={content.rules.html} />
      </Modal>
    </>
  );
};
