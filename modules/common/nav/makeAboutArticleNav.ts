import { AlgolArticle, AlgolNav } from "../../types";
import { aboutIndexNav } from "./aboutIndexNav";
import { makeAboutArticleStep } from "./makeAboutArticleStep";

export const makeAboutArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `about_${article.id}`,
  crumbs: aboutIndexNav.crumbs.concat(aboutIndexNav.me),
  me: makeAboutArticleStep(article),
});
