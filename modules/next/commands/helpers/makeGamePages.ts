import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";
import aboutList from "../../../payloads/dist/articles/gamesAbout";
import rulesList from "../../../payloads/dist/articles/gamesRules";

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
  const aboutArticle = aboutList.find(a => a.id === gameId);
  const aboutPath = path.join(gameFolder, "info");
  fs.ensureDirSync(aboutPath);
  const about = makeGameAboutPage(aboutArticle);
  fs.writeFileSync(path.join(aboutPath, "index.tsx"), about);
  const rulesArticle = rulesList.find(a => a.id === gameId);
  const rulesPath = path.join(gameFolder, "rules");
  fs.ensureDirSync(rulesPath);
  const rules = makeGameRulesPage(rulesArticle);
  fs.writeFileSync(path.join(rulesPath, "index.tsx"), rules);
  console.log("Created pages for", gameId);
};
