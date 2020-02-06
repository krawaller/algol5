import { GameId } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import path from "path";
import fs, { writeFileSync } from "fs-extra";

export const stubGame = (gameId: GameId) => {
  const out = path.join(__dirname, `../../games/${gameId}`);
  if (!fs.existsSync(out)) {
    fs.ensureDirSync(out);
    writeFileSync(
      path.join(out, `about.md`),
      `${meta[gameId].name}! ${meta[gameId].tagline}. More yabber about the game to come!`
    );
    writeFileSync(
      path.join(out, `rules.md`),
      `How to play ${meta[gameId].name}! (soon)`
    );
  }
};
