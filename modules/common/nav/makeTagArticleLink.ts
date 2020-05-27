import { AlgolArticle } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeTagArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/tags/${article.slug}`,
});
