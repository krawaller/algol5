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
    gameId => `import ${gameId}Graphics from '../../graphics/dist/svgDataURIs/${gameId}'
import ${gameId}Meta from '../../games/definitions/${gameId}/meta'
import ${gameId}Variants from '../../games/definitions/${gameId}/variants'`
  )
  .join("\n");

const items = gameIds
  .map(
    gameId => `  {
    gameId: "${gameId}",
    slug: ${gameId}Meta.slug,
    name: ${gameId}Meta.name,
    setup: ${gameId}Variants[0].arr!.setup,
    graphics: ${gameId}Graphics
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
  `import { AlgolSetupAnon, AlgolGameGraphics } from '../../types'
${imports}

export type TitleData = {
  gameId: string
  slug: string
  name: string
  setup: AlgolSetupAnon
  graphics: AlgolGameGraphics
}
  
export const data: TitleData[] = [
${items}
]; export default data`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "titleData.ts"), code);

console.log("TitlePage data payload written");
