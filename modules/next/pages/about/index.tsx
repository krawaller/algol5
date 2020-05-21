import React, { Fragment } from "react";
import Head from "next/head";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import about from "../../../payloads/dist/listings/about";

// TODO - metadata!

const crumbs = [{ content: "About" }];

const AboutIndexPage: AlgolPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={props.actions}
        title="About Chessicals"
        list={about}
      />
    </Fragment>
  );
};

export default AboutIndexPage;
