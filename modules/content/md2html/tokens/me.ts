import { TokenHandler } from "./_handler";

// Takes a ME token and renders a Chessicals ref.

export const me: TokenHandler = () => {
  return `<span class="md-me">Chessicals</span>`;
};
