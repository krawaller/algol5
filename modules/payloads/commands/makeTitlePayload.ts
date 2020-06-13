import prettier from "prettier";
import path from "path";
import fs from "fs-extra";
import { list } from "../../games/dist/list";
import defs from "../../games/dist/lib";
import graphics from "../../graphics/dist/svgDataURIs";

const out = path.join(__dirname, "../dist");
fs.ensureDirSync(out);

const data = list.map(gameId => ({
  gameId,
  name: defs[gameId].meta.name,
  arr: defs[gameId].variants[0].arr!,
  graphics: graphics[gameId],
}));

const code = prettier.format(
  `export const data = ${JSON.stringify(data)}; export default data`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "titleData.ts"), code);

console.log("TitlePage data payload written");
