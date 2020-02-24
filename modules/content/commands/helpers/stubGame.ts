import { GameId } from "../../../games/dist/list";
import meta from "../../../games/dist/meta";
import path from "path";
import fs, { writeFileSync } from "fs-extra";

export const stubGame = (gameId: GameId) => {
  const out = path.join(__dirname, `../../material/games/${gameId}`);
  if (!fs.existsSync(out)) {
    fs.ensureDirSync(out);
    writeFileSync(
      path.join(out, `about.md`),
      `${meta[gameId].name}! ${meta[gameId].tagline}. More yabber about the game to come!`
    );
    writeFileSync(path.join(out, `links.ts`), `export const links = {};\n`);
    writeFileSync(
      path.join(out, `rules.md`),
      `${meta[gameId].name} is played on a {DIM} board with the following setup:

{SETUP}

Soon we will show the rules for ${meta[gameId].name} here! In the meantime you can read them {EXTLINK:url=${meta[gameId].source},text=here}.`
    );
    fs.ensureDirSync(path.join(out, `pics`));
    const cap = gameId[0].toUpperCase() + gameId.slice(1);
    writeFileSync(
      path.join(out, "arrangements.ts"),
      `// File created by the stubGame command

import { AlgolArrangements } from "../../../../types";
import {
  ${cap}Position,
  ${cap}Unit,
} from "../../../../games/dist/games/${gameId}";

// Add your arrangements in this object, and then you can refer to them
// from the markdown files. Those references will be replaced by a
// generated SVG when the content is written to html.
export const arrangements: AlgolArrangements<${cap}Position, ${cap}Unit> = {};`
    );
  }
};
