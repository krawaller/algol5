import React, { FunctionComponent, useMemo, Fragment } from "react";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { LocalSession, LocalSessionActions } from "../LocalSession";
import { useModal } from "../../helpers";
import { ButtonGroup } from "../ButtonGroup";
import { Markdown } from "../Markdown";

export interface GameLandingActions {
  newLocalBattle: (code: string) => void;
  loadLocalSession: (session: AlgolLocalBattle) => void;
  navTo: (path: string) => void;
  toBattleLobby: () => void;
  importSession: (str: string) => void;
  continuePreviousSession: () => void;
  reportError: AlgolErrorReporter;
}

type GameLandingHTML = {
  about: {
    html: string;
    updated: string;
  };
  rules: {
    html: string;
    updated: string;
  };
};

type GameLandingProps = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  hasPrevious: boolean;
  content: GameLandingHTML;
  variants: AlgolVariantAnon[];
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, actions, graphics, hasPrevious, content, variants } = props;
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal();
  const [isRulesModalOpen, openRulesModal, closeRulesModal] = useModal();
  const [isAboutModalOpen, openAboutModal, closeAboutModal] = useModal();

  // hack actions to close game modal when chosen a game
  const localSessionActions = useMemo(
    (): LocalSessionActions => ({
      loadLocalSession: (session: AlgolLocalBattle) => {
        actions.loadLocalSession(session);
        closeSessionModal();
      },
      newLocalBattle: (code: string) => {
        actions.newLocalBattle(code);
        closeSessionModal();
      },
      importSession: (str: string) => {
        actions.importSession(str);
        closeSessionModal();
      },
      continuePreviousSession: () => {
        closeSessionModal();
        actions.continuePreviousSession();
      },
      reportError: actions.reportError,
    }),
    []
  );
  return (
    <Fragment>
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
      <div className={styles.gameLandingQuote}>{meta.tagline}</div>
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
          variants={variants}
        />
      </Modal>
      <Modal
        isOpen={isAboutModalOpen}
        onClose={closeAboutModal}
        title={"About the game"}
        subtitle={`updated ${content.about.updated}`}
      >
        <Markdown actions={actions} html={content.about.html} />
      </Modal>
      <Modal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        title={"How to play"}
        subtitle={`updated ${content.rules.updated}`}
      >
        <Markdown actions={actions} html={content.rules.html} />
      </Modal>
    </Fragment>
  );
};
