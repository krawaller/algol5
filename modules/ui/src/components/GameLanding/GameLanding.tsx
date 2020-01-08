import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolLocalBattle,
  AlgolGameGraphics,
} from "../../../../types";
import { getSessionList } from "../../../../local/src";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { LocalSession, LocalSessionActions } from "../LocalSession";

export interface GameLandingActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
  navTo: (path: string) => void;
  toBattleLobby: () => void;
}

type GameLandingProps = {
  meta: AlgolMeta<string, string>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  session: null | AlgolLocalBattle;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, actions, graphics, session } = props;
  const [sessions, setSessions] = useState<AlgolLocalBattle[]>([]);
  const updateSessions = () => {
    setSessions(
      getSessionList(meta.id, false).concat(getSessionList(meta.id, true))
    );
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(updateSessions, []);
  const openModal = () => {
    updateSessions();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // hack actions to close modal when chosen
  const localSessionActions = useMemo(
    (): LocalSessionActions => ({
      load: (session: AlgolLocalBattle) => {
        closeModal();
        actions.load(session);
      },
      new: () => {
        closeModal();
        actions.new();
      },
    }),
    []
  );
  return (
    <Fragment>
      <div className={styles.gameLanding}>
        <Button onClick={openModal}>Local</Button>
        <Button notImplemented="Online play will come in a future version!">
          Remote
        </Button>
        <a href={meta.source} target="_blank">
          <Button>Go to rules (external)</Button>
        </a>
        {session && (
          <Button onClick={actions.toBattleLobby}>
            Back to current session
          </Button>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Play locally">
          <LocalSession
            actions={localSessionActions}
            sessions={sessions}
            meta={meta}
            graphics={graphics}
          />
        </Modal>
      </div>
    </Fragment>
  );
};
