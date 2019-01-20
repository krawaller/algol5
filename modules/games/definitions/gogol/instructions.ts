import { GogolInstructions } from "./_types";

const gogolInstructions: GogolInstructions = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 2] },
      "Select a unit to move",
      { line: ["Select where to deploy your", "king"] }
    ]
  },
  selectkingdeploy: { line: ["Press", "deploy", "to place your king here"] },
  selectunit: {
    ifelse: [
      { anyat: ["kings", "selectunit"] },
      {
        line: [
          "Select where to",
          {
            orlist: [
              { if: [{ notempty: "kingwalk" }, { value: "move" }] },
              { if: [{ notempty: "jumptargets" }, { value: "jump" }] }
            ]
          },
          "your",
          "king",
          {
            if: [
              { overlaps: ["nokings", { union: ["kingwalk", "jumptargets"] }] },
              "without making a forbidden configuration"
            ]
          }
        ]
      },
      {
        line: [
          "Select where to move",
          { if: [{ notempty: "jumptargets" }, "or jump"] },
          "your",
          "pawn",
          {
            if: [
              { notempty: "nosoldiers" },
              "without making a forbidden configuration"
            ]
          }
        ]
      }
    ]
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to jump from",
      "selectunit",
      "to",
      "selectjumptarget",
      "and kill the",
      { nameat: { onlyin: "splashed" } },
      "at",
      { pos: { onlyin: "splashed" } }
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to go from",
      "selectunit",
      "to",
      "selectmovetarget"
    ]
  }
};

export default gogolInstructions;
