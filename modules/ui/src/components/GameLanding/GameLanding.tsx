import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import ReactModal from "react-modal";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolLocalBattle,
  AlgolGameGraphics,
} from "../../../../types";
import { getSessionList } from "../../../../local/src";
import { SessionList } from "../SessionList";

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
  const sessionListActions = useMemo(
    () => ({
      load: (session: AlgolLocalBattle) => {
        closeModal();
        actions.load(session);
      },
    }),
    []
  );
  return (
    <Fragment>
      <div className={styles.gameLanding}>
        <button className={styles.gameButtonLink} onClick={actions.new}>
          Start a local game
        </button>
        <a href={meta.source} target="_blank" className={styles.gameButtonLink}>
          Go to rules (external)
        </a>
        <button
          className={styles.gameButtonLink}
          disabled={isModalOpen || sessions.length === 0}
          onClick={openModal}
        >
          Load game
        </button>
        {session && (
          <button onClick={actions.toBattleLobby}>Back to {session.id}</button>
        )}
        <ReactModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <div>
            <button onClick={closeModal}>Back</button>
            <hr />
            <SessionList
              sessions={sessions}
              graphics={graphics}
              actions={sessionListActions}
            />
          </div>
        </ReactModal>
      </div>
    </Fragment>
  );
};
