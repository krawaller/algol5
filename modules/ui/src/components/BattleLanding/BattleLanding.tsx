import React, { FunctionComponent, Fragment, useState, useMemo } from "react";
import {
  AlgolLocalBattle,
  AlgolMeta,
  AlgolBattle,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
} from "../../../../types";

import css from "./BattleLanding.cssProxy";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { ExportBattle } from "../ExportBattle";
import { BattleLandingOngoing } from "./BattleLanding.Ongoing";
import { ButtonGroup } from "../ButtonGroup";

interface BattleLandingActions {
  deleteSession: (sessionId: string, retreatToGameLobby: boolean) => void;
  reportError: AlgolErrorReporter;
}

type BattleLandingProps = {
  actions: BattleLandingActions;
  session: AlgolLocalBattle;
  battle: AlgolBattle;
  meta: AlgolMeta<AlgolGameBlobAnon>;
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
        <BattleLandingOngoing session={session} variant={battle.variant} />
      </div>
      <ButtonGroup>
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
          onError={actions.reportError}
          intent="danger"
          controlId="delete-session-button"
          onClick={() => {
            if (
              confirm(
                "Are you sure you want to delete this session? It will be forever lost!"
              )
            ) {
              actions.deleteSession(session.id, true);
            }
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Export session">
        <ExportBattle battle={battle} meta={meta} session={session} />
      </Modal>
    </Fragment>
  );
};
