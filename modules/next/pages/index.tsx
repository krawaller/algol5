import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../helpers";
import { TitlePage } from "../../ui/src/components/TitlePage";

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <TitlePage actions={pageActions} />
    </Fragment>
  );
};

export default IndexPage;
