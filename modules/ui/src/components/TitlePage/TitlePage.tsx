/*
 * Used in the Next app as the main Index page for the app
 */

import React, {
  FunctionComponent,
  useCallback,
  Fragment,
  useState,
} from "react";
import { GameList } from "../GameList";
import { usePrefetchGames } from "./TitlePage.prefetch";
import { PageActions } from "../../helpers";
import { GameId, list } from "../../../../games/dist/list";
import { Modal } from "../Modal";
import { Page } from "../Page";
import base64TitlePic from "../../../base64/title.png.proxy";
import styles from "./TitlePage.cssProxy";
import { Button } from "../Button";
import TitlePageNews from "./TitlePage.News";
import TitlePageAbout from "./TitlePage.about";

type TitlePageProps = {
  actions: PageActions;
};

type ModalContent = "games" | "news" | "about";

const modalTitles: Record<ModalContent, string> = {
  games: "Pick your poison!",
  news: "News",
  about: "About the site",
};

export const TitlePage: FunctionComponent<TitlePageProps> = props => {
  const { actions } = props;
  const navToGame = useCallback(
    (gameId: GameId) => actions.navTo(`/games/${gameId}`),
    [actions]
  );
  usePrefetchGames(actions);
  const [modalContent, setModalContent] = useState<false | ModalContent>(false);
  const openModal = (content: ModalContent) => {
    setModalContent(content);
  };
  const closeModal = () => {
    setModalContent(false);
  };
  const modal =
    modalContent === "games" ? (
      <GameList callback={navToGame} />
    ) : modalContent === "news" ? (
      <TitlePageNews />
    ) : modalContent === "about" ? (
      <TitlePageAbout />
    ) : null;
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
          <div className={styles.titlePageButtonContainer}>
            <Button big onClick={() => openModal("games")}>
              Play a game!
            </Button>
            <Button onClick={() => openModal("about")}>About</Button>
            <Button onClick={() => openModal("news")}>News</Button>
          </div>
          <Modal
            isOpen={Boolean(modalContent)}
            onClose={closeModal}
            title={modalContent ? modalTitles[modalContent] : ""}
          >
            {modal}
          </Modal>
        </Fragment>
      }
    />
  );
};

export default TitlePage;
