import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";
import svgToMiniDataURI from "mini-svg-data-uri";
import { render } from "../../render";
import { AlgolGameGraphics } from "../../../types";

const boardOut = path.join(__dirname, "../../dist/svgBoards");
const jsonOut = path.join(__dirname, "../../dist/svgDataURIs");

export async function makeGameGraphics(gameId: string) {
  const def = lib[gameId];
  const graphics: AlgolGameGraphics = {
    icons: def.graphics.icons,
    boards: {},
  };
  await fs.ensureDir(boardOut);
  for (const [name, boardDef] of Object.entries(def.boards)) {
    const boardSVG = render({ board: boardDef, tileMap: def.graphics.tiles });
    await fs.writeFile(path.join(boardOut, `${gameId}_${name}.svg`), boardSVG);
    graphics.boards[name] = {
      height: boardDef.height,
      width: boardDef.width,
      dataURI: svgToMiniDataURI(boardSVG),
    };
  }

  await fs.ensureDir(jsonOut);
  await fs.writeFile(
    path.join(jsonOut, gameId + ".ts"),
    `import { AlgolGameGraphics } from "../../../types";\n` +
      `export const ${gameId}BoardGraphics: AlgolGameGraphics = ${JSON.stringify(
        graphics,
        null,
        2
      )};\n` +
      `export default ${gameId}BoardGraphics\n`
  );
  console.log("Generated SVG board and JSON for", gameId);
}
