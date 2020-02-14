import list from "../../games/dist/list";
import fs from "fs-extra";
import path from "path";

fs.writeFileSync(
  path.join(__dirname, "../dist/svgDataURIs.ts"),
  `import { GameId } from "../../games/dist/list";\n` +
    `import { AlgolGameGraphics } from "../../types";\n` +
    list.map(id => `import ${id} from './svgDataURIs/${id}'\n`).join("") +
    `const data: { [key in GameId]: AlgolGameGraphics } = { ${list.join(
      ", "
    )} };\nexport default data;\n`
);
console.log("Wrote file exporting all game graphics");
