import React from "react";

import { AlgolPage } from "../../../ui/src/helpers/AlgolPage";
import { PayloadArticleListPage } from "../../../ui/src/components/PayloadArticleListPage";
import tags from "../../../payloads/dist/listings/tags";

// TODO - more metadata!

const crumbs = [{ content: "Tags" }];

const TagIndexPage: AlgolPage = props => {
  return (
    <PayloadArticleListPage
      crumbs={crumbs}
      actions={props.actions}
      title="Tags"
      list={tags}
    />
  );
};

TagIndexPage.title = "Tags";

export default TagIndexPage;
