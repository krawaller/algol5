import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import ReactModal from "react-modal";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolBattleSave,
  AlgolLocalBattle,
  AlgolGameGraphics,
} from "../../../../types";
import { getSessionList } from "../../../../local/src";
import { SessionList } from "../SessionList";

type GameLandingProps = {
  meta: AlgolMeta<string, string>;
  callback: (action: ["new", null] | ["load", AlgolBattleSave]) => void;
  graphics: AlgolGameGraphics;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, callback, graphics } = props;
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
  const loadBattle = useCallback((btlSave: AlgolBattleSave) => {
    closeModal();
    callback(["load", btlSave]);
  }, []);
  return (
    <div className={styles.gameLanding}>
      <button
        className={styles.gameButtonLink}
        onClick={() => callback(["new", null])}
      >
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
      <ReactModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div>
          <button onClick={closeModal}>Back</button>
          <hr />
          <SessionList
            sessions={sessions}
            graphics={graphics}
            callback={loadBattle}
          />
        </div>
      </ReactModal>
    </div>
  );
};
