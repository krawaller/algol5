import { KriegInstructions } from "./_types";

const kriegInstructions: KriegInstructions = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 2] },
      {
        line: [
          "Select",
          "notfrozens",
          "to move (except",
          { unitat: { onlyin: "myfrozens" } },
          "who moved last turn)"
        ]
      },
      { line: ["Select", "notfrozens", "to move"] }
    ]
  },
  selectunit: {
    line: ["Select", "an empty square to move", { unitat: "selectunit" }, "to"]
  },
  selectmove: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go",
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
