import { TokenHandler } from "./_handler";
import { list } from '../../../games/dist/list'

// Takes a COUNT token and renders the numbers of games in Chessicals.

export const count: TokenHandler = () => {
  return `<span class="md-count">${list.length}</span>`;
};
