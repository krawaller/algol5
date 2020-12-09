import prettier from "prettier";
import path from "path";
import fs from "fs-extra";
import { list } from "../../games/dist/list";
import defs from "../../games/dist/lib";

const out = path.join(__dirname, "../dist");
fs.ensureDirSync(out);

const gameIds = list.filter(gameId => !defs[gameId].meta.hidden);

const items = gameIds
  .map(
    gameId => `  {
    gameId: "${gameId}",
    slug: allMeta.${gameId}.slug,
    name: allMeta.${gameId}.name,
    graphics: allGraphics.${gameId},
    demo: allDemos.${gameId},
    added: allMeta.${gameId}.added,
    mainVariant: "${defs[gameId].variants[0].code}"
  },`
  )
  .join("\n");

const code = prettier.format(
  `import { AlgolGameGraphics, AlgolDemo } from '../../types'
import allGraphics from '../../graphics/dist/svgDataURIs'
import allMeta from '../../games/dist/meta'
import { GameId } from "../../games/dist/list"
import allDemos from '../../battle/dist/allDemos'

export type TitleData = {
  gameId: GameId
  slug: string
  name: string
  graphics: AlgolGameGraphics,
  demo: AlgolDemo,
  added: string,
  mainVariant: string
}
  
export const data: TitleData[] = [
${items}
]; export default data`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "titleData.ts"), code);

console.log("TitlePage data payload written");
