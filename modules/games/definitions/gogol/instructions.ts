import { GogolInstructions } from "./_types";

const gogolInstructions: GogolInstructions = {
  startTurn: {
    ifelse: [
      { morethan: [["turn"], 2] },
      { line: ["Select", "kings", "or", "soldiers", "to move"] },
      { line: ["Select", "where to deploy your", "kings"] }
    ]
  },
  selectkingdeploy: {
    line: [
      "Press",
      "deploy",
      "to place your",
      "kings",
      "at",
      "selectkingdeploy"
    ]
  },
  selectunit: {
    ifelse: [
      { anyat: ["kings", "selectunit"] },
      {
        line: [
          "Select",
          "where to",
          {
            orlist: [
              { if: [{ notempty: "kingwalk" }, { value: "move" }] },
              { if: [{ notempty: "jumptargets" }, { value: "jump" }] }
            ]
          },
          "your",
          "kings",
          {
            if: [
              {
                overlaps: ["nokings", { union: ["kingwalk", "jumptargets"] }]
              },
              "without making a forbidden configuration"
            ]
          }
        ]
      },
      {
        line: [
          "Select",
          "where to move",
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
      "to make",
      { unitat: "selectunit" },
      "jump to",
      "selectjumptarget",
      "and kill",
      { unitat: { onlyin: "splashed" } }
    ]
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to make",
      { unitat: "selectunit" },
      "go",
      "to",
      "selectmovetarget"
    ]
  }
};

export default gogolInstructions;
