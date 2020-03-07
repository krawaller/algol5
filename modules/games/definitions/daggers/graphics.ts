// Here you define how terrains should be drawn, and what icons (pawn, rook, etc) to use
// for the various groups. The group-icon mapping here is used as the source of truth for what
// groups are available in your game. Add a group here, run the type analysis and it will be added
// to the types for the game!

import { DaggersDefinition } from "./_types";

const daggersGraphics: DaggersDefinition["graphics"] = {
  tiles: { base: "playercolour" },
  icons: { daggers: "bishop", crowns: "king" }
};

export default daggersGraphics;
