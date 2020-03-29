/*
 * Used in the Next app as the main Index page for the app
 */

import React, { FunctionComponent, useCallback, Fragment } from "react";
import { GameList } from "../GameList";
import { usePrefetchGames } from "./TitlePage.prefetch";
import { PageActions, useModal } from "../../helpers";
import { GameId, list } from "../../../../games/dist/list";
import { Modal } from "../Modal";
import { Page } from "../Page";
import base64TitlePic from "../../../base64/title.png.proxy";
import styles from "./TitlePage.cssProxy";
import { Button } from "../Button";
import TitlePageNews from "./TitlePage.News";
import TitlePageAbout from "./TitlePage.About";
import { ButtonGroup } from "../ButtonGroup";

// TODO - lazy load?
import { newsList } from "../../../../content/dist/newsList";
import { allNews } from "../../../../content/dist/allNews";
import { ArticleViewer } from "../ArticleViewer";

type TitlePageProps = {
  actions: PageActions;
};

export const TitlePage: FunctionComponent<TitlePageProps> = props => {
  const { actions } = props;
  const navToGame = useCallback(
    (gameId: GameId) => actions.navTo(`/games/${gameId}`),
    [actions]
  );
  usePrefetchGames(actions);
  const [isGameModalOpen, openGameModal, closeGameModal] = useModal();
  const [isNewsModalOpen, openNewsModal, closeNewsModal] = useModal();
  const [isAboutModalOpen, openAboutModal, closeAboutModal] = useModal();

  return (
    <Page
      top={<img src={base64TitlePic} />}
      strip={
        <div className={styles.titlePageStrip}>
          A passion-powered collection of {list.length} abstract games
        </div>
      }
      body={
        <Fragment>
          <ButtonGroup>
            <Button big disabled={isGameModalOpen} onClick={openGameModal}>
              Play a game!
            </Button>
            <Button disabled={isAboutModalOpen} onClick={openAboutModal}>
              About
            </Button>
            <Button disabled={isNewsModalOpen} onClick={openNewsModal}>
              News
            </Button>
          </ButtonGroup>
          <Modal
            isOpen={isGameModalOpen}
            onClose={closeGameModal}
            title="Pick your poison"
          >
            <GameList callback={navToGame} />
          </Modal>
          <Modal
            isOpen={isAboutModalOpen}
            onClose={closeAboutModal}
            title="About the site"
          >
            <TitlePageAbout />
          </Modal>
          <Modal isOpen={isNewsModalOpen} onClose={closeNewsModal} title="News">
            <ArticleViewer
              actions={actions}
              backButtonText="Back to news list"
              articles={allNews}
              list={newsList}
            />
          </Modal>
        </Fragment>
      }
    />
  );
};

export default TitlePage;
