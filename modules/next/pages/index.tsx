import React, { Fragment } from "react";
import Head from "next/head";

import { AlgolPage } from "../../ui/src/helpers/AlgolPage";
import { TitlePage } from "../../ui/src/components/TitlePage";

const IndexPage: AlgolPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <TitlePage actions={props.actions} />
    </Fragment>
  );
};

export default IndexPage;
