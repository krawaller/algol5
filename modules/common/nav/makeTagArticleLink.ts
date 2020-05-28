import { AlgolArticle, AlgolNavLink } from "../../types";

export const makeTagArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/tags/${article.slug}`,
});
