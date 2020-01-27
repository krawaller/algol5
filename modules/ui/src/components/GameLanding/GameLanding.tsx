import React, { FunctionComponent, useMemo, Fragment } from "react";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolErrorReporter,
} from "../../../../types";
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
  error: AlgolErrorReporter;
}

type GameLandingProps = {
  meta: AlgolMeta<string, string>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  hasPrevious: boolean;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, actions, graphics, hasPrevious } = props;
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal();
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  const [isAboutModalOpen, openAboutModal, closeAboutModal] = useModal();

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
          meta={meta}
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
