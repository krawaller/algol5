import { ThreemusketeersDefinition } from "./_types";

const threemusketeersInstructions: ThreemusketeersDefinition["instructions"] = {
  startTurn: {
    playercase: [
      { line: ["Select", "which", "kings", "to move"] },
      { line: ["Select", "which", "pawns", "to move"] }
    ]
  },
  selectunit: {
    playercase: [
      {
        line: [
          "Select",
          { unittype: ["pawns", 2] },
          "adjacent to",
          { unitat: "selectunit" },
          "to attack"
        ]
      },
      {
        line: [
          "Select",
          "an empty space adjacent to",
          { unitat: "selectunit" },
          "to move to"
        ]
      }
    ]
  },
  selectmovetarget: {
    playercase: [
      {
        line: [
          "Press",
          "move",
          "to make",
          { unitat: "selectunit" },
          "attack",
          { unitat: "selectmovetarget" }
        ]
      },
      {
        line: [
          "Press",
          "move",
          "to make",
          { unitat: "selectunit" },
          "go to",
          "selectmovetarget"
        ]
      }
    ]
  }
};

export default threemusketeersInstructions;
