import { AlgolArticle, AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { tagIndexLink } from "./tagIndexLink";
import { makeTagArticleLink } from "./makeTagArticleLink";

export const makeTagArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `tag_${article.id}`,
  crumbs: [homeLink, tagIndexLink],
  links: [],
  me: makeTagArticleLink(article),
});
