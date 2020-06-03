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

type TitlePageProps = {
  actions: AppActions;
};

export const TitlePage: FunctionComponent<TitlePageProps> = () => {
  return (
    <Page
      title="Welcome to Chessicals!"
      top={<img src={base64TitlePic} />}
      body={
        <Fragment>
          <ButtonGroup>
            <span>
              A passion-powered collection of {list.length} abstract games
            </span>
          </ButtonGroup>
        </Fragment>
      }
    />
  );
};

export default TitlePage;
