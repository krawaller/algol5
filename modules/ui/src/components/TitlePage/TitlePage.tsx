/*
 * Used in the Next app as the main Index page for the app
 */

import React, { FunctionComponent, useCallback, Fragment } from "react";
import { GameList } from "../GameList";
import { usePrefetchGames } from "./TitlePage.prefetch";

import { PageActions } from "../../helpers";
import { GameId } from "../../../../games/dist/list";

import { Page } from "../Page";
import base64TitlePic from "../../../base64/title.png.proxy";

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
    <Page
      top={<img src={base64TitlePic} />}
      strip={<div>Welcome!</div>}
      body={
        <Fragment>
          <p>
            Welcome! This is rather bare bones still, but, click a game below to
            try it out!
          </p>
          <hr />
          <GameList callback={navToGame} />
        </Fragment>
      }
    />
  );
};

export default TitlePage;
