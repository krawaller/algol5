import { AlgolArticle, AlgolNav } from "../../types";
import { tagIndexNav } from "./tagIndexNav";
import { makeTagArticleStep } from "./makeTagArticleStep";

export const makeTagArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `tag_${article.id}`,
  crumbs: tagIndexNav.crumbs.concat(tagIndexNav.me),
  me: makeTagArticleStep(article),
});
