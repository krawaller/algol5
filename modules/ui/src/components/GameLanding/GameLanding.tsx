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
import { SessionList } from "../SessionList";
import { Modal } from "../Modal";

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
        <button onClick={() => (sessions.length ? openModal() : actions.new())}>
          Local
        </button>
        <button onClick={() => alert("Not implemented yet! Sorry! :D")}>
          Remote
        </button>
        <a href={meta.source} target="_blank">
          <button>Go to rules (external)</button>
        </a>
        {session && (
          <button onClick={actions.toBattleLobby}>Back to {session.id}</button>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Play locally">
          <div>
            <button onClick={actions.new}>Start new {meta.name} session</button>
            <p>...or click a previous session below to load it!</p>
            <SessionList
              sessions={sessions}
              graphics={graphics}
              actions={sessionListActions}
            />
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
