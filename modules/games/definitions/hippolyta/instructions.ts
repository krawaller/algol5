import { HippolytaDefinition } from "./_types";

const hippolytaInstructions: HippolytaDefinition["instructions"] = {
  startTurn: { line: ["Select a", { unittype: ["amazons", ["player"]] }] },
  selectunit: {
    line: [
      "Select a",
      { unittype: ["amazons", ["otherplayer"]] },
      "to fire at",
    ],
  },
  selecttarget: {
    line: [
      "Press",
      "fire",
      "to make",
      { unitat: "selectunit" },
      "shoot",
      { unitat: "selecttarget" },
    ],
  },
};

export default hippolytaInstructions;
