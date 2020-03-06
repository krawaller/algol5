import { GekitaiDefinition } from "./_types";

const gekitaiInstructions: GekitaiDefinition["instructions"] = {
  startTurn: { line: ["Select where to drop a unit"] },
  selectdroptarget: {
    line: [
      "Press",
      "drop",
      "to drop a",
      { unittype: ["markers", ["player"]] },
      "at",
      "selectdroptarget"
    ]
  }
};

export default gekitaiInstructions;
