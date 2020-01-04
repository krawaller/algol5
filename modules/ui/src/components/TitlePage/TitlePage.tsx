/*
 * Used in the Next app as the main Index page for the app
 */

import React, { FunctionComponent, useCallback } from "react";
import { GameList } from "../GameList";
import css from "./TitlePage.cssProxy";
import { usePrefetchGames } from "./TitlePage.prefetch";

import { PageActions } from "../../helpers";
import { GameId } from "../../../../games/dist/list";

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
  return (
    <div className={css.titlePage}>
      <h1>Chessicals</h1>
      <p>
        Welcome! This is rather bare bones still, but, click a game below to try
        it out!
      </p>
      <hr />
      <GameList callback={navToGame} />
    </div>
  );
};

export default TitlePage;
