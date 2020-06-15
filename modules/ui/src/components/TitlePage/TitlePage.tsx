/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import base64CoffeePic from "../../../dist/base64/buymeacoffee3.png.proxy";
import base64ForumPic from "../../../dist/base64/jointheforum3.png.proxy";
import css from "./TitlePage.cssProxy";
import { Board } from "../Board";
import { useBoard } from "./TitlePage.useBoard";
import { setup2army } from "../../../../common";

export const TitlePage: AlgolPage = () => {
  const { graphics, setup, name } = useBoard();
  return (
    <Page
      title="Hello!"
      top={
        <Fragment>
          <div className={css.titlePageBlarb}>
            <em>Welcome to</em>
            <h3>Chessicals</h3>
            <em>where you can play</em>
            <h4>{name}</h4>
          </div>
          <div className={css.titlePageBoardContainer}>
            <Board
              graphics={graphics}
              marks={[]}
              potentialMarks={[]}
              units={setup2army(setup)}
            />
          </div>
        </Fragment>
      }
      body={
        <div className={css.titlePageButtonContainer}>
          <a
            className={css.titlePageLink}
            href="https://forum.chessicals.com"
            target="_blank"
            rel="noopener"
            style={{ backgroundImage: `url(${base64ForumPic})` }}
          />
          <a
            className={css.titlePageLink}
            href="https://www.buymeacoffee.com/chessicals"
            target="_blank"
            rel="noopener"
            style={{ backgroundImage: `url(${base64CoffeePic})` }}
          />
        </div>
      }
    />
  );
};

TitlePage.title = "Chessicals";
TitlePage.nav = homeNav;
TitlePage.mainImage = "/images/title.png";

export default TitlePage;
