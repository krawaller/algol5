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
import ReactModal from "react-modal";
import { PageActions } from "../../helpers";
import { GameId, list } from "../../../../games/dist/list";

import { Page } from "../Page";
import base64TitlePic from "../../../base64/title.png.proxy";
import styles from "./TitlePage.cssProxy";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Page
      top={<img src={base64TitlePic} />}
      strip={<div>Welcome!</div>}
      body={
        <Fragment>
          <p>
            Congratulations! You've found the AWESOMEST abstract board game site
            there is! We've got {list.length} games and counting!
          </p>
          <div className={styles.titlePageButtonContainer}>
            <button onClick={openModal}>Play a game</button>
            <button
              onClick={() => alert("It rules! What more do u need to know?")}
            >
              About the site
            </button>
          </div>
          <ReactModal isOpen={isModalOpen} onRequestClose={closeModal}>
            <button
              onClick={closeModal}
              className={styles.titlePageModalCloser}
            >
              X
            </button>
            <p>Pick your poison! :D</p>
            <GameList callback={navToGame} />
          </ReactModal>
        </Fragment>
      }
    />
  );
};

export default TitlePage;
