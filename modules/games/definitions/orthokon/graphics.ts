// Here you define how terrains should be drawn, and what icons (pawn, rook, etc) to use
// for the various groups. The group-icon mapping here is used as the source of truth for what
// groups are available in your game. Add a group here, run the type analysis and it will be added
// to the types for the game!

import { OrthokonDefinition } from "./_types";

const orthokonGraphics: OrthokonDefinition["graphics"] = {
  icons: { soldiers: "pawn" },
  tiles: {}
};

export default orthokonGraphics;
