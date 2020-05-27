import { AlgolArticle } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeAboutArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/about/${article.slug}`,
});
