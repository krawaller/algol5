/*
 * Used in the Next app as the main Index page for the app
 */

import React, {
  FunctionComponent,
  useCallback,
  Fragment,
  useEffect,
} from "react";
import { GameList } from "../GameList";
import { PageActions, useModal } from "../../helpers";
import { GameId, list } from "../../../../games/dist/list";
import { Modal } from "../Modal";
import { Page } from "../Page";
import base64TitlePic from "../../../dist/base64/title.png.proxy";
import styles from "./TitlePage.cssProxy";
import { Button } from "../Button";
import TitlePageAbout from "./TitlePage.About";
import { ButtonGroup } from "../ButtonGroup";
import { usePrefetchList } from "../../helpers/usePrefetchList";
import { Link } from "../Link";

type TitlePageProps = {
  actions: PageActions;
};

const gameUrls = list.map(gameId => `/games/${gameId}`);

export const TitlePage: FunctionComponent<TitlePageProps> = props => {
  const { actions } = props;
  const navToGame = useCallback(
    (gameId: GameId) => actions.navTo(`/games/${gameId}`),
    [actions]
  );
  usePrefetchList(actions, gameUrls);
  useEffect(() => {
    actions.prefetch("/news");
  }, []);
  const [isGameModalOpen, openGameModal, closeGameModal] = useModal();
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
            <Link text="News" url="/news" actions={actions} asButton />
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
        </Fragment>
      }
    />
  );
};

export default TitlePage;
