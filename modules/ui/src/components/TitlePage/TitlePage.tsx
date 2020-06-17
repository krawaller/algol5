/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import base64CoffeePic from "../../../dist/base64/coffee.png.proxy";
import base64ChatPic from "../../../dist/base64/chat.png.proxy";
import base64MailPic from "../../../dist/base64/email.png.proxy";
import css from "./TitlePage.cssProxy";
import { Board } from "../Board";
import { useBoard } from "./TitlePage.useBoard";
import { setup2army } from "../../../../common";

// Valid until July 17th
const slackInviteLink =
  "https://join.slack.com/t/chessicals/shared_invite/zt-f5ztpbs5-n1IbFFjWv9qccsIfjEQSfw";

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
            href={slackInviteLink}
            target="_blank"
            rel="noopener"
            style={{ backgroundImage: `url(${base64ChatPic})` }}
          >
            Join the Slack
          </a>
          <a
            className={css.titlePageLink}
            href="mailto:david@krawaller.se"
            target="_blank"
            rel="noopener"
            style={{ backgroundImage: `url(${base64MailPic})` }}
          >
            Send an email
          </a>
          <a
            className={css.titlePageLink}
            href="https://www.buymeacoffee.com/chessicals"
            target="_blank"
            rel="noopener"
            style={{ backgroundImage: `url(${base64CoffeePic})` }}
          >
            Buy me a coffee
          </a>
        </div>
      }
    />
  );
};

TitlePage.title = "Chessicals";
TitlePage.nav = homeNav;
TitlePage.mainImage = "/images/title.png";

export default TitlePage;
