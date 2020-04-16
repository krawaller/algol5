import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import news from "../../../payloads/dist/listings/news";

// TODO - metadata!

const crumbs = [{ content: "News" }];

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={pageActions}
        title="News"
        list={news}
      />
    </Fragment>
  );
};

export default IndexPage;
