import React, { FunctionComponent, useMemo } from "react";
import { punctuate } from "../../../../common";
import typography from "../../typography.cssProxy";
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
    <div>
      <div className={typography.boardPageHeadline}>{meta.name}</div>
      <div className={typography.boardPageCopy}>
        <p>
          {punctuate(meta.tagline, "!")} A game{" "}
          {meta.author ? `by ${meta.author}` : "of unknown origin"}.{" "}
          {meta.added === "GENESIS"
            ? "Included in Chessicals since the beginning."
            : "Added to Chessicals " +
              meta.added +
              " by " +
              (meta.addedBy || "David Waller") +
              "."}
        </p>
        <p>
          Play <Button onClick={openSessionModal}>local</Button> or{" "}
          <Button onClick={openRemoteModal}>online</Button>!
        </p>
      </div>
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
    </div>
  );
};
