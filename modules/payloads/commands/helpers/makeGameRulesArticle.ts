import prettier from "prettier";
import fs, { writeFileSync } from "fs-extra";
import path from "path";
import allMeta from "../../../games/dist/meta";
import allDefs from "../../../games/dist/lib";
import { AlgolMeta, AlgolGameBlobAnon } from "../../../types";

const gamesFolder = path.join(__dirname, "../../../content/dist/games");

export const makeGameRulesArticle = (gameId: string) => {
  const meta: AlgolMeta<AlgolGameBlobAnon> = allMeta[gameId];
  const def = allDefs[gameId];
  fs.ensureDirSync(gamesFolder);
  const code = `
// Created by the makeGameRulesArticle command
import { AlgolArticle } from '../../../../types'
import { rules } from '../../../../content/dist/games/${gameId}/rules'

const article: AlgolArticle = {
  id: "${gameId}",
  blurb: "Everything on how to play ${meta.name}",
  slug: "${meta.slug}",
  title: "${meta.name} rules",
  mainImage: "/images/games/${gameId}/${gameId}_${def.variants[0].code}.png",
  updated: rules.updated,
  relations: [],
  html: rules.html
};

export default article;
`;
  const outFolder = path.join(__dirname, "../../dist/articles/gamesRules");
  fs.ensureDirSync(outFolder);
  writeFileSync(
    path.join(outFolder, `${gameId}.ts`),
    prettier.format(code, { filepath: "foo.ts" })
  );
  console.log("Rules Article created for game", gameId);
};
