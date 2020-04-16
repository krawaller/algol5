import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import tags from "../../../payloads/dist/listings/tags";

// TODO - metadata!

const crumbs = [{ content: "Tags" }];

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={pageActions}
        title="Tags"
        list={tags}
      />
    </Fragment>
  );
};

export default IndexPage;
