// Generated by the makeTagPage command

import React from "react";

import { PayloadArticlePage } from "../../../../ui/src/components/PayloadArticlePage";
import { AlgolPage } from "../../../../ui/src/helpers/algolPage";

import article from "../../../../payloads/dist/articles/tags/irreversible";

export const TagArticle: AlgolPage = props => {
  const crumbs = [
    { content: "Tags", url: "/tags" },
    { content: article.title }
  ];
  return (
    <PayloadArticlePage
      crumbs={crumbs}
      article={article}
      actions={props.actions}
    />
  );
};

TagArticle.mainImage = article.mainImage;
TagArticle.title = article.title;
TagArticle.metaDesc = article.blurb;

export default TagArticle;
