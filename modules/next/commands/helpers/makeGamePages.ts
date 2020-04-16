import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";
import abouts from "../../../payloads/dist/articles/gamesAbout";

import { makeGameMainPage } from "./makeGameMainPage";
import { makeGameAboutPage } from "./makeGameAboutPage";
import { makeGameRulesPage } from "./makeGameRulesPage";
import { gameSlug } from "../../../common";

const folder = path.join(__dirname, "../../pages/games");

export const makeGamePages = (gameId: string) => {
  const def = lib[gameId];
  const gameFolder = path.join(folder, gameSlug(def.meta));
  fs.emptyDirSync(gameFolder);
  const main = makeGameMainPage(def);
  fs.writeFileSync(path.join(gameFolder, "index.tsx"), main);
  const aboutArticle = abouts.find(a => a.id === gameId);
  const about = makeGameAboutPage(aboutArticle);
  fs.writeFileSync(path.join(gameFolder, "about.tsx"), about);
  const rules = makeGameRulesPage(def);
  fs.writeFileSync(path.join(gameFolder, "rules.tsx"), rules);
  console.log("Created pages for", gameId);
};
