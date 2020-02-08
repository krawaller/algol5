import { TokenHandler } from "./_symbol";
import { arrangement2sprites } from "../../../common/sprites/sprite.arrangement2sprites";
import { render } from "../../../graphics/render";
import lib from "../../../games/dist/lib";

// Takes an ARR token and turns it into an SVG pic! Expects args `name`, and
// optionally `from`, `to`, `pad`

export const arr: TokenHandler = opts => {
  const { args, arrs, gameId } = opts;
  const def = lib[gameId];
  if (!args.name) {
    throw new Error("Have to provide arrangement name!");
  }
  if (!arrs[args.name]) {
    throw new Error(`Arrangement "${args.name}" could not be found!`);
  }
  const sprites = arrangement2sprites({
    arrangement: arrs[args.name],
    iconMap: def.graphics.icons,
  });
  const svg = render({
    board: def.board,
    tileMap: def.graphics.tiles,
    sprites,
    from: args.from,
    to: args.to,
    pad: args.pad != "false",
  });
  return `<div class="md-arr">\n${svg}\n</div>`;
};
