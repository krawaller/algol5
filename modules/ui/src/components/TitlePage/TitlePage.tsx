/*
 * Used in the Next app as the main Index page for the app
 */

import React, { FunctionComponent } from "react";
import { GameList, ListItemWrapper } from "../GameList";
import css from "./TitlePage.cssProxy";

export type ItemWrapper = ListItemWrapper;
type TitlePageProps = {
  // NextJS will pass in a link as wrapper, that we just pass on to GameList
  itemWrapper: ListItemWrapper;
};

export const TitlePage: FunctionComponent<TitlePageProps> = props => {
  const { itemWrapper } = props;
  return (
    <div className={css.titlePage}>
      <h1>Chessicals</h1>
      <p>
        Welcome! This is rather bare bones still, but, click a game below to try
        it out!
      </p>
      <hr />
      <GameList itemWrapper={itemWrapper} />
    </div>
  );
};

export default TitlePage;
