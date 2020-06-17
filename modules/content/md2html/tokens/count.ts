import { TokenHandler } from "./_handler";
import { gameCount } from "../../../common";

// Takes a COUNT token and renders the numbers of games in Chessicals.

export const count: TokenHandler = () => {
  return `<span class="md-count">${gameCount()}</span>`;
};
