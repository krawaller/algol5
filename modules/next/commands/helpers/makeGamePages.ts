import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";

import { makeMainGamePage } from "./makeMainGamePage";
import { gameSlug } from "../../../common";

const folder = path.join(__dirname, "../../pages/games");

export const makeGamePages = (gameId: string) => {
  const def = lib[gameId];
  const gameFolder = path.join(folder, gameSlug(def.meta));
  fs.emptyDirSync(gameFolder);
  const main = makeMainGamePage(def);
  fs.writeFileSync(path.join(gameFolder, "index.tsx"), main);
  console.log("Created pages for", gameId);
};
