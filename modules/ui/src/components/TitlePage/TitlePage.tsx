/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment, useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import { Board } from "../Board";
import { useBoard } from "./TitlePage.useBoard";
import { gameCount, setup2army } from "../../../../common";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { chunk as slackChunk } from "../../../../content/dist/chunks/slack/chunk";
import { chunk as newbieChunk } from "../../../../content/dist/chunks/newbie/chunk";
import { chunk as veteranChunk } from "../../../../content/dist/chunks/veteran/chunk";
import { ButtonBar } from "../ButtonBar";
import { ButtonGroup } from "../ButtonGroup";
import css from "./TitlePage.cssProxy";
import { Button } from "../Button";

const buttonTexts = ["Hi, I'm new! 👋", "Hello again! 🤘"];

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  const { graphics, setup, name, slug } = useBoard();
  const [isSlackModalOpen, openSlackModal, closeSlackModal] = useModal();
  const dynamicContent = useMemo(
    () => ({ game: `play ${name} ☝`, slack: "join the Slack" }),
    [name]
  );
  const goToCurrentGame = useCallback(() => actions.navTo(`/games/${slug}`), [
    slug,
    actions,
  ]);
  const seeAllGames = useCallback(() => actions.navTo("/games"), [actions]);
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
        top={
          <Fragment>
            <div
              className={classNames(
                css.titlePageBoardWelcome,
                css.titlePageBoardBox
              )}
            >
              <span>welcome to</span>
              <h1>Chessicals</h1>
            </div>
            <div
              className={classNames(
                css.titlePageBoardBox,
                css.titlePageBoardGames
              )}
            >
              <div className={css.titlePageBoardGamesFlicker}>&lt;</div>
              <div className={css.titlePageBoardGamesContent}>
                <div>
                  Here you can{" "}
                  <Button text={`play ${name} ☝`} onClick={goToCurrentGame} />
                </div>
                <div>
                  or{" "}
                  <Button
                    text={`browse all ${gameCount()} games 🙌`}
                    onClick={seeAllGames}
                  />
                </div>
              </div>
              <div className={css.titlePageBoardGamesFlicker}>&gt;</div>
            </div>
            <Board
              graphics={graphics}
              marks={[]}
              potentialMarks={[]}
              units={setup2army(setup)}
            />
          </Fragment>
        }
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
