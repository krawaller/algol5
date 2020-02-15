import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";

// Takes a DIM (board dimensions) token and renders it with special styles. Can take "gameId" arg

export const dim: TokenHandler = opts => {
  const { args, gameId } = opts;
  let { x, y } = args;
  if (!x || !y) {
    if (!gameId) {
      throw new Error(
        "Incomplete DIM, must pass x and y when there's no gameId!"
      );
    }
    const board = lib[gameId].board;
    x = board.width.toString();
    y = board.height.toString();
  }
  return `<span class="md-dim" data-dim-x="${x}" data-dim-y="${y}" >${x}&times;${y}</span>`;
};
