/*
 * Used in the Next app as the main Index page for the app
 */

import React, { Fragment } from "react";
import { AlgolPage } from "../../../../types";
import { Page } from "../Page";
import { TitleBoard } from "./TitlePage.Board";
import { TitlePageBody } from "./TitlePage.Body";
import { setTitlePageAttributes } from "./setTitlePageAttributes";

export const TitlePage: AlgolPage = props => {
  const { actions } = props;
  return (
    <Fragment>
      <Page
        title="Hello!"
        top={<TitleBoard actions={actions} />}
        body={<TitlePageBody actions={actions} />}
      />
    </Fragment>
  );
};

setTitlePageAttributes(TitlePage);

export default TitlePage;
