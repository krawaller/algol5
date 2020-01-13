import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  Fragment,
  useCallback,
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
import { useModal } from "../../helpers";
import GameLandingAbout from "./GameLanding.About";
import GameLandingRules from "./GameLanding.Rules";

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
  const updateSessions = useCallback(() => {
    setSessions(
      getSessionList(meta.id, false).concat(getSessionList(meta.id, true))
    );
  }, [meta.id]);
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal(
    to => to && updateSessions() // update session when session modal closes (since user made a choice)
  );
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  const [isAboutModalOpen, openAboutModal, closeAboutModal] = useModal();
  useEffect(updateSessions, []);
  // hack actions to close game modal when chosen a game
  const localSessionActions = useMemo(
    (): LocalSessionActions => ({
      load: (session: AlgolLocalBattle) => {
        closeSessionModal();
        actions.load(session);
      },
      new: () => {
        closeSessionModal();
        actions.new();
      },
    }),
    []
  );
  return (
    <Fragment>
      <div className={styles.gameLandingQuote}>{meta.tagline}</div>
      <div className={styles.gameLandingButtons}>
        <Button big onClick={openSessionModal}>
          Local
        </Button>
        <Button disabled="Online play will come in a future version!">
          Remote
        </Button>
        <Button disabled={isAboutModalOpen} onClick={openAboutModal}>
          About
        </Button>
        <Button onClick={openRulesModal}>Rules</Button>
        {session && (
          <Button onClick={actions.toBattleLobby}>
            Back to current session
          </Button>
        )}
      </div>
      <Modal
        isOpen={isSessionModalOpen}
        onClose={closeSessionModal}
        title="Play locally"
      >
        <LocalSession
          actions={localSessionActions}
          sessions={sessions}
          graphics={graphics}
        />
      </Modal>
      <Modal
        isOpen={isAboutModalOpen}
        onClose={closeAboutModal}
        title={"About " + meta.name}
      >
        <GameLandingAbout />
      </Modal>
      <Modal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        title={"How to play " + meta.name}
      >
        <GameLandingRules meta={meta} />
      </Modal>
    </Fragment>
  );
};
