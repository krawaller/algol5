import React, { FunctionComponent, useMemo, Fragment } from "react";
import styles from "./GameLanding.cssProxy";
import {
  AlgolMeta,
  AlgolGameGraphics,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { NewLocalSession, NewLocalSessionActions } from "../NewLocalSession";
import { useModal } from "../../helpers";
import { ButtonGroup } from "../ButtonGroup";

export interface GameLandingActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
  newLocalBattle: (code: string) => void;
  loadLocalSession: (sessionId: string) => void;
  toBattleLobby: () => void;
  importSession: (str: string) => void;
  reportError: AlgolErrorReporter;
}

type GameLandingProps = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  variants: AlgolVariantAnon[];
  previousSessionId?: string | null;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, actions, graphics, previousSessionId, variants } = props;
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal();

  // hack actions to close game modal when chosen a game
  const localSessionActions = useMemo(
    (): NewLocalSessionActions => ({
      loadLocalSession: (sessionId: string) => {
        actions.loadLocalSession(sessionId);
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
      reportError: actions.reportError,
    }),
    []
  );
  return (
    <Fragment>
      <ButtonGroup>
        <Button big onClick={openSessionModal}>
          Play {meta.name}!
        </Button>
      </ButtonGroup>
      <div className={styles.gameLandingQuote}>{meta.tagline}</div>
      <Modal
        isOpen={isSessionModalOpen}
        onClose={closeSessionModal}
        title="Play locally"
      >
        <NewLocalSession
          actions={localSessionActions}
          meta={meta}
          graphics={graphics}
          previousSessionId={previousSessionId}
          variants={variants}
        />
      </Modal>
    </Fragment>
  );
};
