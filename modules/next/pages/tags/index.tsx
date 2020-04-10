import React, { Fragment } from "react";
import Head from "next/head";

import { pageActions } from "../../helpers";
import { TagListPage } from "../../../ui/src/components/TagListPage";

// TODO - metadata!

const IndexPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Chessicals</title>
      </Head>
      <TagListPage actions={pageActions} />
    </Fragment>
  );
};

export default IndexPage;
