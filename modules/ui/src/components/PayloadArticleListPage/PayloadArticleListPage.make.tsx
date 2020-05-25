import React from "react";
import { AlgolListing } from "../../../../types";
import { AlgolPage } from "../../helpers/AlgolPage";
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
        crumbs={[]} // TODO - kill
      />
    );
  };

  return ArticleListComp;
};
