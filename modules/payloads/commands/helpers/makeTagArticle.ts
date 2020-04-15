import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";
import { getGamesForTag } from "./getGamesForTag";
import { AlgolArticle, AlgolListing } from "../../../types";

const tagArticlesFolder = path.join(__dirname, "../../dist/articles/tags");

export const makeTagArticle = (tagId: string) => {
  const gameListings = getGamesForTag(tagId).map(
    gameId => require(`../../dist/listings/games/${gameId}`) as AlgolListing
  );
  const tagYaml = require(`../../../content/dist/tags/${tagId}/listing`)
    .listing;
  const tagHtml = require(`../../../content/dist/tags/${tagId}/tag`).tag;
  const article: AlgolArticle = {
    id: tagId,
    blurb: tagYaml.blurb,
    title: tagYaml.title,
    mainImage: tagYaml.mainImage,
    updated: tagYaml.updated,
    relations: {
      "Games with this tag": gameListings,
    },
    html: tagHtml,
  };
  fs.ensureDirSync(tagArticlesFolder);
  const code = `
// Created by the makeTagArticle command

const article = ${JSON.stringify(article)};

export default article;
`;
  writeFileSync(
    path.join(tagArticlesFolder, `${tagId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Article created for tag", tagId);
};
