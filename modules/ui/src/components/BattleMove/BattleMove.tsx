export * from "./BattleMove";
import React, { FunctionComponent, useState } from "react";
import { AlgolBattleUI } from "../../../../types";
import { Button } from "../Button";
import { BattleHelp } from "../BattleHelp";
import { BattleControls } from "../BattleControls";
import { Switch } from "../Switch";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { ScrollBox } from "../ScrollBox";
import { ButtonGroup } from "../ButtonGroup";
import { Content } from "../Content";

export interface BattleMoveActions {
  undoBattleCommand: () => void;
  endTurn: () => void;
  command: (cmnd: string) => void;
  navTo: (url: string) => void;
  prefetch: (url: string) => void;
}

type BattleMoveProps = {
  ui: AlgolBattleUI;
  actions: BattleMoveActions;
  rules: {
    html: string;
    updated: string;
  };
};

export const BattleMove: FunctionComponent<BattleMoveProps> = props => {
  const { ui, rules, actions } = props;
  const [showHelp, setShowHelp] = useState(true);
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  return (
    <>
      <ScrollBox>
        <>
          <ButtonGroup>
            <Content
              content={{
                line: [
                  { text: `turn ${ui.turnNumber}, ` },
                  { player: ui.player },
                ],
              }}
            />
            <Button
              disabled={
                (ui.winner !== undefined && "Battle is over") ||
                (!Boolean(ui.undo) && "No command to undo")
              }
              onClick={actions.undoBattleCommand}
            >
              Undo
            </Button>
            <Button>
              <Switch
                text="Text"
                flipped={showHelp}
                onFlip={() => setShowHelp(!showHelp)}
              />
            </Button>{" "}
            <Button onClick={openRulesModal}>Peek rules</Button>
          </ButtonGroup>
          {showHelp ? (
            <BattleHelp actions={actions} instruction={ui.instruction} />
          ) : (
            <BattleControls actions={actions} ui={ui} />
          )}
        </>
      </ScrollBox>
      <Modal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        title={"How to play"}
        subtitle={`updated ${rules.updated}`}
      >
        <Markdown actions={actions} html={rules.html} />
      </Modal>
    </>
  );
};
