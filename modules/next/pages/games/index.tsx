import React, { Fragment } from "react";
import Head from "next/head";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import games from "../../../payloads/dist/listings/games";

// TODO - metadata!

const crumbs = [{ content: "Games" }];

const GameIndexPage: AlgolPage = props => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <PayloadArticleListPage
        crumbs={crumbs}
        actions={props.actions}
        title={`All ${games.length} games`}
        list={games}
      />
    </Fragment>
  );
};

export default GameIndexPage;
