import React, { FunctionComponent } from "react";
import css from "./BattleHelp.cssProxy";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { useModal } from "../../helpers";
import { Button } from "../Button";
import { AlgolContentAnon } from "../../../../types";
import { Content } from "../Content";
import { ButtonGroup } from "../ButtonGroup";

export interface BattleHelpActions {
  navTo: (path: string) => void;
}

export interface BattleHelpContent {
  rules: {
    html: string;
    updated: string;
  };
}

type BattleHelpProps = {
  content: BattleHelpContent;
  actions: BattleHelpActions;
  instruction: AlgolContentAnon;
};

export const BattleHelp: FunctionComponent<BattleHelpProps> = props => {
  const { content, actions, instruction } = props;
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  return (
    <>
      <div className={css.battleHelpContentContainer}>
        <Content content={instruction} />
      </div>
      <ButtonGroup>
        <Button onClick={openRulesModal}>Rules</Button>
      </ButtonGroup>
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
