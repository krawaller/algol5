import React from "react";
import { AlgolListing, AlgolPage } from "../../../../types";
import { PayloadArticleListPage } from "./PayloadArticleListPage";

export const makePayloadArticleListPage = (
  list: AlgolListing[],
  title: string
) => {
  const ArticleListComp: AlgolPage = props => {
    // TODO - add listing container with metadata, that we can add to algolpage here
    return (
      <PayloadArticleListPage
        title={title}
        list={list}
        actions={props.actions}
      />
    );
  };

  return ArticleListComp;
};
