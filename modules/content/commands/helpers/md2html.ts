import prettier from "prettier";
import { AlgolArrangements } from "../../../types";
import { render } from "../../../graphics/render";
import { GameId } from "../../../games/dist/list";
import lib from "../../../games/dist/lib";
import { arrangement2sprites } from "../../../common/sprites/sprite.arrangement2sprites";

type Md2htmlOpts = {
  md: string;
  arrs: AlgolArrangements;
  gameId: GameId;
};

export const md2html = (opts: Md2htmlOpts) => {
  let { md, arrs, gameId } = opts;
  md = md.replace(/\[ARR:([^\]]*)]/g, (_: string, args: string) => {
    const instr = args.split(",").reduce(
      (memo, arg) => ({
        ...memo,
        [arg.split("=")[0]]: arg.split("=")[1],
      }),
      {} as { [key: string]: string }
    );
    const def = lib[gameId];
    if (!instr.name) {
      throw new Error("Have to provide arrangement name!");
    }
    if (!arrs[instr.name]) {
      throw new Error(`Arrangement "${instr.name}" could not be found!`);
    }
    const sprites = arrangement2sprites({
      arrangement: arrs[instr.name],
      iconMap: def.graphics.icons,
    });
    return render({
      board: def.board,
      tileMap: def.graphics.tiles,
      sprites,
      from: instr.from,
      to: instr.to,
      pad: instr.pad != "false",
    });
  });
  const html = `<div>${md}</div>`;
  const nice = prettier
    .format(html, { filepath: "foo.html" })
    .replace(/\n$/, "");
  return nice;
};
