import { AlgolArticle, AlgolNav } from "../../types";
import { tagIndexNav } from "./tagIndexNav";
import { makeTagArticleLink } from "./makeTagArticleLink";

export const makeTagArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `tag_${article.id}`,
  crumbs: tagIndexNav.crumbs.concat(tagIndexNav.me),
  links: [],
  me: makeTagArticleLink(article),
});
