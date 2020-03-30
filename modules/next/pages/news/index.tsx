import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { NewsListPage } from "../../../ui/src/components/NewsListPage";

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <NewsListPage actions={pageActions} />
    </Fragment>
  );
};

export default IndexPage;
