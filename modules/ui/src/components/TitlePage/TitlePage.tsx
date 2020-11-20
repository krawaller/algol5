/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment, useCallback, useMemo, useState } from "react";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import { useTitleData } from "./TitlePage.useTitleData";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { chunk as slackChunk } from "../../../../content/dist/chunks/slack/chunk";
import { chunk as newbieChunk } from "../../../../content/dist/chunks/newbie/chunk";
import { chunk as veteranChunk } from "../../../../content/dist/chunks/veteran/chunk";
import { ButtonBar } from "../ButtonBar";
import { ButtonGroup } from "../ButtonGroup";
import { TitleBoard } from "./TitlePage.Board";

const buttonTexts = ["Hi, I'm new! 👋", "Hello again! 🤘"];

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  const { name, slug } = useTitleData().titleData;
  const [isSlackModalOpen, openSlackModal, closeSlackModal] = useModal();
  const dynamicContent = useMemo(
    () => ({ game: `play ${name} ☝`, slack: "join the Slack" }),
    [name]
  );
  const goToCurrentGame = useCallback(() => actions.navTo(`/games/${slug}`), [
    slug,
    actions,
  ]);
  const triggerSlack = useCallback(
    (e: Event) => {
      e.preventDefault();
      openSlackModal();
    },
    [openSlackModal]
  );
  const dynamicActions = useMemo(
    () => ({
      game: goToCurrentGame,
      slack: triggerSlack,
    }),
    [goToCurrentGame, triggerSlack]
  );
  const [contentIdx, setContentIdx] = useState(0);
  return (
    <Fragment>
      <Page
        title="Hello!"
        top={<TitleBoard actions={actions} />}
        body={
          <Fragment>
            <ButtonGroup>
              <ButtonBar
                texts={buttonTexts}
                onChange={setContentIdx}
                current={contentIdx}
              />
            </ButtonGroup>
            {contentIdx === 0 ? (
              <Markdown
                html={newbieChunk}
                actions={actions}
                dynamicContent={dynamicContent}
                dynamicActions={dynamicActions}
              />
            ) : (
              <Markdown
                html={veteranChunk}
                actions={actions}
                dynamicContent={dynamicContent}
                dynamicActions={dynamicActions}
              />
            )}
          </Fragment>
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
