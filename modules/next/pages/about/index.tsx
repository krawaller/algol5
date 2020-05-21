import React from "react";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import about from "../../../payloads/dist/listings/about";

// TODO - more metadata!

const crumbs = [{ content: "About" }];

const AboutIndexPage: AlgolPage = props => {
  return (
    <PayloadArticleListPage
      crumbs={crumbs}
      actions={props.actions}
      title="About Chessicals"
      list={about}
    />
  );
};

AboutIndexPage.title = "About Chessicals";
AboutIndexPage.metaDesc = "Articles with more information about Chessicals";

export default AboutIndexPage;
