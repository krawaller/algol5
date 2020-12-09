import React, { FunctionComponent, useMemo, Fragment } from "react";
import { punctuate } from "../../../../common";
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
import { NewRemoteSession } from "../NewRemoteSession";
import { useModal } from "../../helpers";
import { ButtonGroup } from "../ButtonGroup";

export type GameLandingActions = {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
  newLocalBattle: (code: string) => void;
  loadLocalSession: (sessionId: string) => void;
  toBattleLobby: () => void;
  importSession: (str: string) => void;
  reportError: AlgolErrorReporter;
};

type GameLandingProps = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  actions: GameLandingActions;
  graphics: AlgolGameGraphics;
  variants: AlgolVariantAnon[];
  previousSessionId?: string | null;
  corruptSessions: Record<string, string>;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const {
    meta,
    actions,
    graphics,
    previousSessionId,
    variants,
    corruptSessions,
  } = props;
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal();
  const [isRemoteModalOpen, openRemoteModal, closeRemoteModal] = useModal();

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
      <div className={styles.gameLandingQuote}>
        A game {meta.author ? `by ${meta.author}` : "of unknown origin"}
        {". "}
        {punctuate(meta.tagline, "!")}
      </div>
      <ButtonGroup>
        <Button big onClick={openSessionModal}>
          Local
        </Button>
        <Button big onClick={openRemoteModal}>
          Online
        </Button>
      </ButtonGroup>
      {/* <div className={styles.gameLandingQuote}>
        {meta.added === "GENESIS"
          ? meta.name + " has been included in Chessicals since the beginning."
          : meta.name + " was added to Chessicals " + meta.added + "."}
      </div> */}
      <Modal
        isOpen={isRemoteModalOpen}
        onClose={closeRemoteModal}
        title="Online play (WIP)"
      >
        <NewRemoteSession />
      </Modal>
      <Modal
        isOpen={isSessionModalOpen}
        onClose={closeSessionModal}
        title="Local pass-and-play"
      >
        <NewLocalSession
          actions={localSessionActions}
          meta={meta}
          graphics={graphics}
          previousSessionId={previousSessionId}
          variants={variants}
          corruptSessions={corruptSessions}
        />
      </Modal>
    </Fragment>
  );
};

//   (date === "GENESIS"
//     ? meta[gameId].name +
//       " has been included in Chessicals since the beginning."
//     : meta[gameId].name + " was added to Chessicals " + date + ".");
