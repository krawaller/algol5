import React, { FunctionComponent, Fragment, useState, useMemo } from "react";
import { AlgolLocalBattle, AlgolMeta, AlgolBattle } from "../../../../types";

import css from "./BattleLanding.cssProxy";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { ExportBattle } from "../ExportBattle";
import { BattleLandingNewSession } from "./BattleLanding.NewSession";
import { BattleLandingOngoing } from "./BattleLanding.Ongoing";

interface BattleLandingActions {
  toHistory: () => void;
  toBattleControls: () => void;
  deleteCurrentSession: () => void;
}

type BattleLandingProps = {
  actions: BattleLandingActions;
  session: AlgolLocalBattle;
  battle: AlgolBattle;
  meta: AlgolMeta<string, string>;
};

export const BattleLanding: FunctionComponent<BattleLandingProps> = props => {
  const { session, actions, meta, battle } = props;
  const [isModalOpen, setModal] = useState<boolean>(false);
  const { closeModal, openModal } = useMemo(
    () => ({
      closeModal: () => setModal(false),
      openModal: () => setModal(true),
    }),
    [setModal]
  );
  const stillFirstTurn = battle.turnNumber === 1 && battle.player === 1;
  return (
    <Fragment>
      <div className={css.battleLandingContent}>
        {session.updated || session.type === "imported" ? (
          <BattleLandingOngoing session={session} />
        ) : (
          <BattleLandingNewSession meta={meta} session={session} />
        )}
      </div>
      <div className={css.battleLandingButtons}>
        <Button
          big
          disabled={session.endedBy && "This session is finished!"}
          onClick={actions.toBattleControls}
        >
          Play
        </Button>
        <Button
          disabled={
            stillFirstTurn &&
            "You can see the history after the first turn is finished!"
          }
          onClick={actions.toHistory}
        >
          History
        </Button>
        <Button
          disabled={
            stillFirstTurn &&
            "You can export the session after the first turn is finished!"
          }
          onClick={openModal}
        >
          Export
        </Button>
        <Button
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this session? It will be forever lost!"
              )
            ) {
              actions.deleteCurrentSession();
            }
          }}
        >
          Delete
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Export session">
        <ExportBattle battle={battle} meta={meta} session={session} />
      </Modal>
    </Fragment>
  );
};
