import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import about from "../../../payloads/dist/listings/about";

// TODO - metadata!

const crumbs = [{ content: "About" }];

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={pageActions}
        title="About Chessicals"
        list={about}
      />
    </Fragment>
  );
};

export default IndexPage;
