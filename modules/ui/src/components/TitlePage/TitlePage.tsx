/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { list } from "../../../../games/dist/list";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import base64TitlePic from "../../../dist/base64/title.png.proxy";
import base64CoffeePic from "../../../dist/base64/buymeacoffee3.png.proxy";
import base64ForumPic from "../../../dist/base64/jointheforum3.png.proxy";
import css from "./TitlePage.cssProxy";
import { ButtonGroup } from "../ButtonGroup";

export const TitlePage: AlgolPage = () => {
  return (
    <Page
      title="Welcome to Chessicals!"
      top={<img src={base64TitlePic} />}
      body={
        <Fragment>
          <ButtonGroup>
            <span>
              A passion-powered collection of {list.length} abstract games for
              you to enjoy! Very much beta software and not too many features,
              but - welcome nonetheless!
            </span>
          </ButtonGroup>
          <ButtonGroup>
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
          </ButtonGroup>
        </Fragment>
      }
    />
  );
};

TitlePage.title = "Chessicals";
TitlePage.nav = homeNav;
TitlePage.mainImage = "/images/title.png";

export default TitlePage;
