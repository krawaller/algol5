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
  AlgolError,
} from "../../../../types";
import { getSessionList } from "../../../../local/src";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { LocalSession, LocalSessionActions } from "../LocalSession";
import { useModal } from "../../helpers";
import GameLandingAbout from "./GameLanding.About";
import GameLandingRules from "./GameLanding.Rules";
import { ButtonGroup } from "../ButtonGroup";

export interface GameLandingActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
  navTo: (path: string) => void;
  toBattleLobby: () => void;
  import: (str: string) => void;
  continuePrevious: () => void;
  error: (err: AlgolError) => void;
}

type GameLandingProps = {
  meta: AlgolMeta<string, string>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  hasPrevious: boolean;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, actions, graphics, hasPrevious } = props;
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
        actions.load(session);
        closeSessionModal();
      },
      new: () => {
        actions.new();
        closeSessionModal();
      },
      import: (str: string) => {
        actions.import(str);
        closeSessionModal();
      },
      continuePrevious: () => {
        closeSessionModal();
        actions.continuePrevious();
      },
      error: actions.error,
    }),
    []
  );
  return (
    <Fragment>
      <div className={styles.gameLandingQuote}>{meta.tagline}</div>
      <ButtonGroup>
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
      </ButtonGroup>
      <Modal
        isOpen={isSessionModalOpen}
        onClose={closeSessionModal}
        title="Play locally"
      >
        <LocalSession
          actions={localSessionActions}
          sessions={sessions}
          graphics={graphics}
          hasPrevious={hasPrevious}
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
