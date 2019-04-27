import { KriegInstructions } from "./_types";

const kriegInstructions: KriegInstructions = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 2] },
      { line: ["Select", "a unit to move that you didn't move last turn"] },
      { line: ["Select", "a unit to move"] }
    ]
  },
  selectunit: { line: ["Select", "an empty square to move to"] },
  selectmove: {
    line: [
      "Press",
      "move",
      "to go from",
      "selectunit",
      {
        ifelse: [
          {
            and: [
              { anyat: ["oppbases", "selectmove"] },
              { noneat: ["oppbases", "selectunit"] }
            ]
          },
          { line: ["into the opponent base at", "selectmove"] },
          { line: ["to", "selectmove"] }
        ]
      }
    ]
  }
};

export default kriegInstructions;
