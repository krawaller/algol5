import React from "react";
import { AlgolArticle, AlgolPage } from "../../../../types";
import { PayloadArticlePage } from "./PayloadArticlePage";

export const makePayloadArticlePage = (article: AlgolArticle) => {
  const ArticleComp: AlgolPage = () => {
    return <PayloadArticlePage article={article} />;
  };

  ArticleComp.mainImage = article.mainImage;
  ArticleComp.title = article.title;
  ArticleComp.metaDesc = article.blurb;
  ArticleComp.displayName =
    "Article" + article.id[0].toUpperCase() + article.id.slice(1);
  ArticleComp.nav = {
    key: article.id,
    crumbs: [],
    me: {
      id: article.id,
      title: article.title,
      desc: article.blurb,
      links: [],
    },
  };

  return ArticleComp;
};
