/*
 * Used in the Next app as the main Index page for the app
 */

import React, { FunctionComponent, Fragment } from "react";
import { AppActions } from "../../../../types";
import { list } from "../../../../games/dist/list";
import { Page } from "../Page";
import base64TitlePic from "../../../dist/base64/title.png.proxy";
import styles from "./TitlePage.cssProxy";
import { ButtonGroup } from "../ButtonGroup";
import { Link } from "../Link";

type TitlePageProps = {
  actions: AppActions;
};

export const TitlePage: FunctionComponent<TitlePageProps> = props => {
  const { actions } = props;

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
            <Link
              text="Play a game!"
              url="/games"
              actions={actions}
              styleMode="asBigButton"
            />
            <Link
              text="About"
              url="/about"
              actions={actions}
              styleMode="asButton"
            />
            <Link
              text="News"
              url="/news"
              actions={actions}
              styleMode="asButton"
            />
            <Link
              text="Tags"
              url="/tags"
              actions={actions}
              styleMode="asButton"
            />
          </ButtonGroup>
        </Fragment>
      }
    />
  );
};

export default TitlePage;
