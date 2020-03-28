import path from "path";
import fs from "fs-extra";
import lib from "../../../games/dist/lib";
import { render } from "../../render";
import { arrangement2sprites } from "../../../common";
import svg2png from "../../svg2png";

export const renderGameActionShots = async (gameId: string) => {
  const target = path.join(__dirname, `../../dist/actionShots/${gameId}`);
  fs.ensureDirSync(target);
  const def = lib[gameId];
  for (const variant of def.variants) {
    if (variant.arr) {
      for (const active of [true, false]) {
        const board = def.boards[variant.board];
        const arr = active
          ? variant.arr
          : {
              ...variant.arr,
              marks: [],
              potentialMarks: [],
            };
        const sprites = arrangement2sprites({
          arrangement: arr,
          iconMap: def.graphics.icons,
        });
        const picWithMarks = render({
          board,
          tileMap: def.graphics.tiles,
          sprites,
          pad: true,
          definitionStrategy: "inline",
        });
        const svgPath = path.join(
          target,
          `${gameId}_${variant.code}${active ? "_active" : ""}.svg`
        );
        await fs.writeFile(svgPath, picWithMarks);
        const pngBuffer = await svg2png(svgPath);
        const pngPath = path.join(
          target,
          `${gameId}_${variant.code}${active ? "_active" : ""}.png`
        );
        const out = fs.createWriteStream(pngPath);
        await new Promise(resolve => {
          out.on("finish", resolve);
          pngBuffer.pipe(out);
        });
      }
      console.log("action shots rendered for", gameId, variant.desc);
    }
  }
};

export default renderGameActionShots;
