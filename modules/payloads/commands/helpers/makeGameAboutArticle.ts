import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";
import { GameId } from "../../../games/dist/list";
import allMeta from "../../../games/dist/meta";
import allDefs from "../../../games/dist/lib";
import { AlgolMeta, AlgolGameBlobAnon } from "../../../types";

const gamesFolder = path.join(__dirname, "../../../content/dist/games");

export const makeGameAboutArticle = (gameId: string) => {
  const newsIds: GameId[] =
    require("../../dist/relations/games2news").default[gameId] || [];
  const meta: AlgolMeta<AlgolGameBlobAnon> = allMeta[gameId];
  const tagIds = meta.tags;
  const def = allDefs[gameId];
  fs.ensureDirSync(gamesFolder);
  const code = `
// Created by the makeGameAboutArticle command
import { AlgolArticle } from '../../../../types'
import { about } from '../../../../content/dist/games/${gameId}/about'
${newsIds
  .map(newsId => `import ${newsId} from '../../listings/news/${newsId}'`)
  .join("\n")}
${tagIds
  .map(tagId => `import ${tagId} from '../../listings/tags/${tagId}'`)
  .join("\n")}

const article: AlgolArticle = {
  id: "${gameId}",
  blurb: "More information about ${meta.name}",
  slug: "${meta.slug}",
  title: "About ${meta.name}",
  mainImage: "/images/games/${gameId}/${gameId}_${def.variants[0].code}.png",
  updated: about.updated,
  relations: [
    {
      title: "${meta.name} has these tags:",
      composite: "games.jpg",
      listings: [${tagIds.join(", ")}]
    },
    {
      title: "News articles mentioning ${meta.name}",
      composite: "news.jpg",
      listings: [${newsIds.join(", ")}]
    }
  ],
  html: about.html
};

export default article;
`;
  const outFolder = path.join(__dirname, "../../dist/articles/gamesAbout");
  fs.ensureDirSync(outFolder);
  writeFileSync(
    path.join(outFolder, `${gameId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("About Article created for game", gameId);
};
