import React, { FunctionComponent, useState, useMemo, Fragment } from "react";
import {
  AlgolSession,
  AlgolMeta,
  AlgolBattle,
  AlgolGameBlobAnon,
} from "../../../../types";

import { Button } from "../Button";
import { Modal } from "../Modal";
import { ExportBattle } from "../ExportBattle";
import { BattleLandingOngoing } from "./BattleLanding.Ongoing";
import { BoardPageContent } from "../BoardPageContent";
import { useAppActions, useLocalBattleActions } from "../../contexts";

type BattleLandingProps = {
  session: AlgolSession;
  battle: AlgolBattle;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  manyVariants?: boolean;
};

export const BattleLanding: FunctionComponent<BattleLandingProps> = props => {
  const { session, meta, battle, manyVariants } = props;
  const appActions = useAppActions();
  const localBattleActions = useLocalBattleActions();
  const [isModalOpen, setModal] = useState<boolean>(false);
  const { closeModal, openModal } = useMemo(
    () => ({
      closeModal: () => setModal(false),
      openModal: () => setModal(true),
    }),
    [setModal]
  );
  const stillFirstTurn = battle.turnNumber === 1 && battle.player === 1;
  const title = `${battle.gameEndedBy ? "Finished" : "Ongoing"} ${
    session.type === "remote" ? "remote" : "local"
  } session`;
  return (
    <Fragment>
      <BoardPageContent title={title}>
        <BattleLandingOngoing
          session={session}
          variant={battle.variant}
          manyVariants={manyVariants}
          gameName={meta.name}
        />
        <p>
          You can{" "}
          <Button
            disabled={
              stillFirstTurn &&
              "You can export the session after the first turn is finished!"
            }
            onClick={openModal}
          >
            export
          </Button>{" "}
          the session to continue it elsewhere, or{" "}
          <Button
            onError={appActions.reportError}
            intent="danger"
            controlId="delete-session-button"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete this session? It will be forever lost!"
                )
              ) {
                localBattleActions.deleteSession(session.id, true);
              }
            }}
          >
            delete
          </Button>{" "}
          it if you don't want it around.
        </p>
      </BoardPageContent>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Export session">
        <ExportBattle battle={battle} meta={meta} session={session} />
      </Modal>
    </Fragment>
  );
};
