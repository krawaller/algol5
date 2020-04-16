import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import games from "../../../payloads/dist/listings/games";

// TODO - metadata!

const crumbs = [{ content: "Games" }];

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={pageActions}
        title={`All ${games.length} games`}
        list={games}
      />
    </Fragment>
  );
};

export default IndexPage;
