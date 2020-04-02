import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";

import { makeMainGamePage } from "./makeMainGamePage";
import { makeAboutGamePage } from "./makeAboutGamePage";
import { makeRulesGamePage } from "./makeRulesGamePage";
import { gameSlug } from "../../../common";

const folder = path.join(__dirname, "../../pages/games");

export const makeGamePages = (gameId: string) => {
  const def = lib[gameId];
  const gameFolder = path.join(folder, gameSlug(def.meta));
  fs.emptyDirSync(gameFolder);
  const main = makeMainGamePage(def);
  fs.writeFileSync(path.join(gameFolder, "index.tsx"), main);
  const about = makeAboutGamePage(def);
  fs.writeFileSync(path.join(gameFolder, "about.tsx"), about);
  const rules = makeRulesGamePage(def);
  fs.writeFileSync(path.join(gameFolder, "rules.tsx"), rules);
  console.log("Created pages for", gameId);
};
