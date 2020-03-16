import path from "path";
import fs from "fs-extra";
import lib from "../../../games/dist/lib";
import { render } from "../../../graphics/render";
import { arrangement2sprites } from "../../../common";
import svg2png from "../../../graphics/convert";

export const renderActionShots = async (gameId: string) => {
  const target = path.join(__dirname, `../../public/images/games/${gameId}`);
  fs.ensureDirSync(target);
  const def = lib[gameId];
  //for (const variant of def.variants) {
  const variant = def.variants[0];
  if (variant.arr) {
    const board = def.boards[variant.board];
    const sprites = arrangement2sprites({
      arrangement: variant.arr,
      iconMap: def.graphics.icons,
    });
    const picWithMarks = render({
      board,
      tileMap: def.graphics.tiles,
      sprites,
      pad: true,
      definitionStrategy: "inline",
    });
    const svgPath = path.join(target, `${gameId}_${variant.code}_active.svg`);
    await fs.writeFile(svgPath, picWithMarks);
    const pngBuffer = await svg2png(svgPath);
    const pngPath = path.join(target, `${gameId}_${variant.code}_active.png`);
    const out = fs.createWriteStream(pngPath);
    await new Promise(resolve => {
      out.on("finish", resolve);
      pngBuffer.pipe(out);
    });
    console.log("action shots rendered for", gameId, variant.desc);
  }
  //}
};

export default renderActionShots;
