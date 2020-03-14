import path from "path";
import fs from "fs-extra";
import lib from "../../../games/dist/lib";
import { render } from "../../../graphics/render";
import { arrangement2sprites } from "../../../common";

export const renderActionShots = gameId => {
  const target = path.join(__dirname, `../../public/images/games/${gameId}`);
  fs.ensureDirSync(target);
  const def = lib[gameId];
  for (const variant of def.variants) {
    if (variant.arr) {
      const board = def.boards[variant.board];
      const picWithMarks = render({
        board,
        tileMap: def.graphics.tiles,
        sprites: arrangement2sprites({
          arrangement: variant.arr,
          iconMap: def.graphics.icons,
        }),
      });
      fs.writeFileSync(
        path.join(target, `${gameId}_${variant.code}_active.svg`),
        picWithMarks
      );
      const picWithoutMarks = render({
        board,
        tileMap: def.graphics.tiles,
        sprites: arrangement2sprites({
          arrangement: {
            ...variant.arr,
            marks: [],
            potentialMarks: [],
          },
          iconMap: def.graphics.icons,
        }),
      });
      fs.writeFileSync(
        path.join(target, `${gameId}_${variant.code}.svg`),
        picWithoutMarks
      );
    }
  }

  console.log("action shots rendered for", gameId);
};

export default renderActionShots;
