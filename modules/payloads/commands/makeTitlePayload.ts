import prettier from "prettier";
import path from "path";
import fs from "fs-extra";
import { list } from "../../games/dist/list";
import defs from "../../games/dist/lib";
import graphics from "../../graphics/dist/svgDataURIs";

const out = path.join(__dirname, "../dist");
fs.ensureDirSync(out);

const data = list
  .filter(gameId => !defs[gameId].meta.hidden)
  .map(gameId => ({
    gameId,
    name: defs[gameId].meta.name,
    setup: defs[gameId].variants[0].arr!.setup,
    graphics: graphics[gameId],
  }));

const code = prettier.format(
  `import { AlgolSetupAnon, AlgolGameGraphics } from '../../types'

export type TitleData = {
  gameId: string
  name: string
  setup: AlgolSetupAnon
  graphics: AlgolGameGraphics
}
  
export const data: TitleData[] = ${JSON.stringify(data)}; export default data`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "titleData.ts"), code);

console.log("TitlePage data payload written");
