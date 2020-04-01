import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { GameListPage } from "../../../ui/src/components/GameListPage";

// TODO - metadata!

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <GameListPage actions={pageActions} />
    </Fragment>
  );
};

export default IndexPage;
