import React, { Fragment } from "react";
import Head from "next/head";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import news from "../../../payloads/dist/listings/news";

// TODO - metadata!

const crumbs = [{ content: "News" }];

const NewsIndexPage: AlgolPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={props.actions}
        title="News"
        list={news}
      />
    </Fragment>
  );
};

export default NewsIndexPage;
