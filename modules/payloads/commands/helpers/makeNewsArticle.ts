import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";
import { GameId } from "../../../games/dist/list";

const newsArticlesFolder = path.join(__dirname, "../../dist/articles/news");

export const makeNewsArticle = (newsId: string) => {
  const gameIds: GameId[] =
    require("../../dist/relations/news2games").default[newsId] || [];
  const newsYaml = require(`../../../content/dist/news/${newsId}/listing`)
    .listing;
  fs.ensureDirSync(newsArticlesFolder);
  const code = `
// Created by the makeNewsArticle command
import { AlgolArticle } from '../../../../types'
import { news } from '../../../../content/dist/news/${newsId}/news'
${gameIds
  .map(gameId => `import ${gameId} from '../../listings/games/${gameId}'`)
  .join("\n")}

const article: AlgolArticle = {
  id: "${newsId}",
  blurb: "${newsYaml.blurb}",
  slug: "${newsYaml.slug}",
  title: "${newsYaml.title}",
  mainImage: "${newsYaml.mainImage}",
  updated: "${newsYaml.updated}",
  relations: [
    {
      title: "Mentioned games",
      composite: "games.png",
      listings: [${gameIds.join(", ")}]
    }
  ],
  html: news
};

export default article;
`;
  writeFileSync(
    path.join(newsArticlesFolder, `${newsId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article created for news", newsId);
};
