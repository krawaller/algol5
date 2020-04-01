import list from "../../games/dist/list";
import fs from "fs-extra";
import path from "path";

const gameGraphics =
  `import { GameId } from "../../games/dist/list";\n` +
  `import { AlgolGameGraphics } from "../../types";\n` +
  list.map(id => `import ${id} from './svgDataURIs/${id}'\n`).join("") +
  `const data: { [key in GameId]: AlgolGameGraphics } = { ${list.join(
    ", "
  )} };\nexport default data;\n`;

fs.writeFileSync(path.join(__dirname, "../dist/svgDataURIs.ts"), gameGraphics);

const actionShots = `
import { GameId } from "../../games/dist/list";
${list
  .map(
    id => `import { dataURI as ${id}_regular } from "./actionShots/${id}/${id}"
import { dataURI as ${id}_active } from "./actionShots/${id}/${id}_active"`
  )
  .join("\n")}

const data: Record<GameId, { regular: string, active: string }> = {
${list
  .map(id => `  ${id}: { regular: ${id}_regular, active: ${id}_active }`)
  .join(",\n")}
}

export default data
`;

fs.writeFileSync(
  path.join(__dirname, "../dist/allActionShots.ts"),
  actionShots
);

console.log("Wrote files exporting all game graphics");
