import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";
import { arrangement2sprites } from "../../../common/sprites/sprite.arrangement2sprites";
import { render } from "../../../graphics/render";

// Takes a SETUP token and renders the setup board for that game. Optionally takes gameId

export const setup: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  // eslint-disable-next-line prefer-const
  let { gameId, name = "basic", board = "basic" } = args;
  if (!gameId) {
    if (thisGameId) {
      gameId = thisGameId;
    } else {
      throw new Error("SETUP needs gameId when there's no contextual id!");
    }
  }
  const def = lib[gameId];

  const sprites = arrangement2sprites({
    arrangement: {
      marks: [],
      potentialMarks: [],
      setup: def.setups[name],
    },
    iconMap: def.graphics.icons,
  });
  const svg = render({
    board: def.boards[board],
    tileMap: def.graphics.tiles,
    sprites,
    from: args.from,
    to: args.to,
    pad: args.pad != "false",
  });
  return `<div class="md-setup" data-setup="${gameId}">\n${svg}\n</div>`;
};
