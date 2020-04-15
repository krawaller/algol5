import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";
import { getGamesForTag } from "./getGamesForTag";

const tagArticlesFolder = path.join(__dirname, "../../dist/articles/tags");

export const makeTagArticle = (tagId: string) => {
  const gameIds = getGamesForTag(tagId);
  const tagYaml = require(`../../../content/dist/tags/${tagId}/listing`)
    .listing;
  const tagHtml = require(`../../../content/dist/tags/${tagId}/tag`).tag;
  fs.ensureDirSync(tagArticlesFolder);
  const code = `
// Created by the makeTagArticle command
import { AlgolArticle } from '../../../../types'
${gameIds
  .map(gameId => `import ${gameId} from '../../listings/games/${gameId}'`)
  .join("\n")}

const article: AlgolArticle = {
  id: "${tagId}",
  blurb: "${tagYaml.blurb}",
  slug: "${tagYaml.slug}",
  title: "${tagYaml.title}",
  mainImage: "${tagYaml.mainImage}",
  updated: "${tagYaml.updated}",
  relations: {
    "Games with this tag": [${gameIds.join(", ")}]
  },
  html: \`${tagHtml}\`
};

export default article;
`;
  writeFileSync(
    path.join(tagArticlesFolder, `${tagId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article created for tag", tagId);
};
