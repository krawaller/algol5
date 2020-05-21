import React from "react";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import news from "../../../payloads/dist/listings/news";

// TODO - more metadata!

const crumbs = [{ content: "News" }];

const NewsIndexPage: AlgolPage = props => {
  return (
    <PayloadArticleListPage
      crumbs={crumbs}
      actions={props.actions}
      title="News"
      list={news}
    />
  );
};

NewsIndexPage.title = "News";

export default NewsIndexPage;
