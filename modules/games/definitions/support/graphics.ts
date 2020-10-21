// Here you define how terrains should be drawn, and what icons (pawn, rook, etc) to use
// for the various groups. The group-icon mapping here is used as the source of truth for what
// groups are available in your game. Add a group here, run the type analysis and it will be added
// to the types for the game!

import { SupportDefinition } from "./_types";

const supportGraphics: SupportDefinition["graphics"] = {
  icons: {
    bases: "rook",
    soldiers: "pawn",
  },
  tiles: {
    center: "playercolour",
    edge: "grass",
  },
};

export default supportGraphics;
