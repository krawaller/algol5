/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment, useMemo } from "react";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import { Board } from "../Board";
import { useBoard } from "./TitlePage.useBoard";
import { setup2army } from "../../../../common";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { chunk as slackChunk } from "../../../../content/dist/chunks/slack/chunk";
import { chunk as homeChunk } from "../../../../content/dist/chunks/home/chunk";

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  const { graphics, setup, name, slug } = useBoard();
  const [isSlackModalOpen, openSlackModal, closeSlackModal] = useModal();
  const dynamicContent = useMemo(
    () => ({ game: `play ${name} ☝`, slack: "join the Slack" }),
    [name]
  );
  const dynamicActions = useMemo(
    () => ({
      game: () => actions.navTo(`/games/${slug}`),
      slack: (e: Event) => {
        e.preventDefault();
        openSlackModal();
      },
    }),
    [name]
  );
  return (
    <Fragment>
      <Page
        title="Hello!"
        top={
          <Board
            graphics={graphics}
            marks={[]}
            potentialMarks={[]}
            units={setup2army(setup)}
          />
        }
        body={
          <Markdown
            html={homeChunk}
            actions={actions}
            dynamicContent={dynamicContent}
            dynamicActions={dynamicActions}
          />
        }
      />
      <Modal
        isOpen={isSlackModalOpen}
        onClose={closeSlackModal}
        title="Chessicals Slack community"
      >
        <Markdown html={slackChunk} actions={actions} />
      </Modal>
    </Fragment>
  );
};

TitlePage.title = "Chessicals";
TitlePage.nav = homeNav;
TitlePage.mainImage = "/images/title.png";

export default TitlePage;
