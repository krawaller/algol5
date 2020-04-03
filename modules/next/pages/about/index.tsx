import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { AboutListPage } from "../../../ui/src/components/AboutListPage";

// TODO - metadata!

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <AboutListPage actions={pageActions} />
    </Fragment>
  );
};

export default IndexPage;
