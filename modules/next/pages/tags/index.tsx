import React, { Fragment } from "react";
import Head from "next/head";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import tags from "../../../payloads/dist/listings/tags";

// TODO - metadata!

const crumbs = [{ content: "Tags" }];

const TagIndexPage: AlgolPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={props.actions}
        title="Tags"
        list={tags}
      />
    </Fragment>
  );
};

export default TagIndexPage;
