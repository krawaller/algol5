/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { Page } from "../Page";
import { TitleBoard } from "./TitlePage.Board";
import { TitleBody } from "./TitlePage.Body";
import { setTitlePageAttributes } from "./setTitlePageAttributes";
import { useTitleData } from "./TitlePage.useTitleData";

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  const titleDemo = useTitleData();
  return (
    <Fragment>
      <Page
        title="Chessicals"
        top={<TitleBoard titleData={titleDemo.titleData} />}
        body={<TitleBody actions={actions} titleDemo={titleDemo} />}
      />
    </Fragment>
  );
};

setTitlePageAttributes(TitlePage);

export default TitlePage;
