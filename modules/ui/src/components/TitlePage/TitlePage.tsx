/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { homeNav } from "../../../../common/nav/homeNav";
import { Page } from "../Page";
import { TitleBoard } from "./TitlePage.Board";
import { TitlePageContent } from "./TitlePage.Content";

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  return (
    <Fragment>
      <Page
        title="Hello!"
        top={<TitleBoard actions={actions} />}
        body={<TitlePageContent actions={actions} />}
      />
    </Fragment>
  );
};

TitlePage.title = "Chessicals";
TitlePage.nav = homeNav;
TitlePage.mainImage = "/images/title.png";

export default TitlePage;
