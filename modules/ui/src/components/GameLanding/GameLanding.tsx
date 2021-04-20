import React, { Fragment, FunctionComponent, useEffect } from "react";
import { punctuate } from "../../../../common";
import {
  AlgolMeta,
  AlgolGameGraphics,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { NewLocalSession } from "../NewLocalSession";
import { NewRemoteSession } from "../NewRemoteSession";
import { useModal } from "../../helpers";
import { BoardPageContent } from "../BoardPageContent";
import { useAppState } from "../../contexts";

type GameLandingProps = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  graphics: AlgolGameGraphics;
  variants: AlgolVariantAnon[];
  previousSessionId?: string | null;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, graphics, previousSessionId, variants } = props;
  const [isSessionModalOpen, openSessionModal, closeSessionModal] = useModal();
  const [isRemoteModalOpen, openRemoteModal, closeRemoteModal] = useModal();
  const { battleMode, sessionId } = useAppState();
  useEffect(() => {
    closeSessionModal(); // close session as soon as we have created a new game
  }, [battleMode, sessionId]);

  return (
    <Fragment>
      <BoardPageContent title={meta.name}>
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
      </BoardPageContent>
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
          meta={meta}
          graphics={graphics}
          previousSessionId={previousSessionId}
          variants={variants}
        />
      </Modal>
    </Fragment>
  );
};
