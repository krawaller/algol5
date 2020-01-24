// Here you define how terrains should be drawn, and what icons (pawn, rook, etc) to use
// for the various groups. The group-icon mapping here is used as the source of truth for what
// groups are available in your game. Add a group here, run the type analysis and it will be added
// to the types for the game!

import { JostleGraphics } from "./_types";

const jostleGraphics: JostleGraphics = {
  icons: { checkers: "pawn" },
  tiles: {}
};

export default jostleGraphics;
