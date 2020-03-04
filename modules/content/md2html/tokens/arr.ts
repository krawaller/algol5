import { TokenHandler } from "./_handler";
import { arrangement2sprites } from "../../../common/sprites/sprite.arrangement2sprites";
import { render } from "../../../graphics/render";
import lib from "../../../games/dist/lib";

// Takes an ARR token and turns it into an SVG pic! Expects args `name`, and
// optionally `from`, `to`, `pad`

export const arr: TokenHandler = opts => {
  const { args, arrs, gameId } = opts;
  if (!gameId) {
    throw new Error("ARR token but no gameId!");
  }
  const def = lib[gameId];
  const { name, board = "basic", from, to, pad } = args;
  if (!name) {
    throw new Error("Have to provide arrangement name!");
  }
  if (!arrs[name]) {
    throw new Error(`Arrangement "${name}" could not be found!`);
  }
  const sprites = arrangement2sprites({
    arrangement: arrs[name],
    iconMap: def.graphics.icons,
  });
  const svg = render({
    board: def.boards[board],
    tileMap: def.graphics.tiles,
    sprites,
    from: from,
    to: to,
    pad: pad != "false",
  });
  return `<div class="md-arr">\n${svg}\n</div>`;
};
