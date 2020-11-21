import prettier from "prettier";
import path from "path";
import fs from "fs-extra";
import { list } from "../../games/dist/list";
import defs from "../../games/dist/lib";
import graphics from "../../graphics/dist/svgDataURIs";

const out = path.join(__dirname, "../dist");
fs.ensureDirSync(out);

const gameIds = list.filter(gameId => !defs[gameId].meta.hidden);

const imports = gameIds
  .map(
    gameId =>
      `import ${gameId}Variants from '../../games/definitions/${gameId}/variants'`
  )
  .join("\n");

const items = gameIds
  .map(
    gameId => `  {
    gameId: "${gameId}",
    slug: allMeta.${gameId}.slug,
    name: allMeta.${gameId}.name,
    setup: ${gameId}Variants[0].arr!.setup,
    graphics: allGraphics.${gameId},
    demo: allDemos.${gameId}
  },`
  )
  .join("\n");

const data = list
  .filter(gameId => !defs[gameId].meta.hidden)
  .map(gameId => ({
    gameId,
    name: defs[gameId].meta.name,
    setup: defs[gameId].variants[0].arr!.setup,
    graphics: graphics[gameId],
    slug: defs[gameId].meta.slug,
  }));

const code = prettier.format(
  `import { AlgolSetupAnon, AlgolGameGraphics, AlgolDemo } from '../../types'
import allGraphics from '../../graphics/dist/svgDataURIs'
import allMeta from '../../games/dist/meta'
import { GameId } from "../../games/dist/list"
import allDemos from '../../battle/dist/allDemos'
${imports}

export type TitleData = {
  gameId: GameId
  slug: string
  name: string
  setup: AlgolSetupAnon
  graphics: AlgolGameGraphics,
  demo: AlgolDemo
}
  
export const data: TitleData[] = [
${items}
]; export default data`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "titleData.ts"), code);

console.log("TitlePage data payload written");
