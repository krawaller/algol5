import fs from "fs-extra";
import path from "path";
import lib from "../../../games/dist/lib";
import svgToMiniDataURI from "mini-svg-data-uri";
import { render } from "../../render";

const boardOut = path.join(__dirname, "../../dist/svgBoards");
const jsonOut = path.join(__dirname, "../../dist/svgDataURIs");

export async function exportBoard(gameId: string) {
  const def = lib[gameId];
  const { height, width } = def.board;

  const boardSVG = render({ gameId });

  await fs.ensureDir(boardOut);
  await fs.writeFile(path.join(boardOut, gameId + ".svg"), boardSVG);
  await fs.ensureDir(jsonOut);
  await fs.writeFile(
    path.join(jsonOut, gameId + ".ts"),
    `import { AlgolGameGraphics } from "../../../types";\n` +
      `export const ${gameId}BoardGraphics: AlgolGameGraphics = ${JSON.stringify(
        {
          height,
          width,
          icons: def.graphics.icons,
          dataURI: svgToMiniDataURI(boardSVG),
        },
        null,
        2
      )};\n` +
      `export default ${gameId}BoardGraphics\n`
  );
  console.log("Generated SVG board and JSON for", gameId);
}
