import { AlgolArticle, AlgolNavLink } from "../../types";

export const makeNewsArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/news/${article.slug}`,
});
