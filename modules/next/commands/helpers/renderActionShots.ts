import path from "path";
import fs from "fs-extra";
import svgexport from "svgexport";
import lib from "../../../games/dist/lib";
import { render } from "../../../graphics/render";
import { arrangement2sprites } from "../../../common";

const renderPNG = (obj: any) =>
  new Promise(resolve => svgexport.render(obj, resolve));

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
    fs.writeFileSync(
      path.join(target, `${gameId}_${variant.code}_active.svg`),
      picWithMarks
    );
    await renderPNG({
      input: [
        path.join(target, `${gameId}_${variant.code}_active.svg`),
        "100%",
        "2x",
      ],
      output: [path.join(target, `${gameId}_${variant.code}_active.png`)],
    });
  }
  //}

  console.log("action shots rendered for", gameId);
};

export default renderActionShots;
