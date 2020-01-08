import React, { FunctionComponent, Fragment, useState, useMemo } from "react";
import { AlgolLocalBattle, AlgolMeta, AlgolBattle } from "../../../../types";
import { SessionStatus } from "../SessionStatus";

import css from "./BattleLanding.cssProxy";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { ExportBattle } from "../ExportBattle";

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
  if (!session.updated) {
    // New session!
    return (
      <Fragment>
        <div className={css.battleLandingContent}>
          You're playing a new {meta.name} session with id{" "}
          <code>{session.id}</code>. Once the first turn is completed you'll be
          able to view the session history here, and reload the session from the{" "}
          {meta.name} lobby.
        </div>
        <Button onClick={actions.toBattleControls}>Start playing</Button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className={css.battleLandingContent}>
        <div>Session ID: {session.id}</div>
        <div>Created: {new Date(session.created).toString().slice(0, 10)}</div>
        <div>Updated: {new Date(session.updated).toString().slice(0, 10)}</div>
        <div>
          Status: <SessionStatus session={session} />
        </div>
      </div>
      <div className={css.battleLandingButtons}>
        {!session.endedBy && (
          <Button onClick={actions.toBattleControls}>Continue playing</Button>
        )}
        <Button onClick={actions.toHistory}>See history</Button>
        <Button onClick={openModal}>Export</Button>
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
          Delete session
        </Button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Export session">
          <ExportBattle battle={battle} meta={meta} session={session} />
        </Modal>
      </div>
    </Fragment>
  );
};
