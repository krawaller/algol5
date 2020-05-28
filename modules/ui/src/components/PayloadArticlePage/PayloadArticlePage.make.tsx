import React from "react";
import { AlgolArticle, AlgolPage } from "../../../../types";
import { PayloadArticlePage } from "./PayloadArticlePage";

export const makePayloadArticlePage = (article: AlgolArticle) => {
  const ArticleComp: AlgolPage = props => {
    return (
      <PayloadArticlePage
        crumbs={[]} // TODO - kill
        article={article}
        actions={props.actions}
      />
    );
  };

  ArticleComp.mainImage = article.mainImage;
  ArticleComp.title = article.title;
  ArticleComp.metaDesc = article.blurb;
  ArticleComp.displayName =
    "Article" + article.id[0].toUpperCase() + article.id.slice(1);
  ArticleComp.nav = {
    key: article.id,
    links: [],
    crumbs: [],
    me: {
      title: article.title,
      desc: article.blurb,
    },
  };

  return ArticleComp;
};
