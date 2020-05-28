import { AlgolArticle, AlgolNav } from "../../types";
import { aboutIndexNav } from "./aboutIndexNav";
import { makeAboutArticleLink } from "./makeAboutArticleLink";

export const makeAboutArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `about_${article.id}`,
  crumbs: aboutIndexNav.crumbs.concat(aboutIndexNav.me),
  links: [],
  me: makeAboutArticleLink(article),
});
