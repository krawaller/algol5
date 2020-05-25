import { AlgolArticle } from "../../types";
import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { tagIndexLink } from "./tagIndexLink";

export const makeTagArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `tag_${article.id}`,
  crumbs: [homeLink, tagIndexLink],
  links: [],
});
