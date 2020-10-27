import { PartisansDefinition } from "./_types";

const partisansInstructions: PartisansDefinition["instructions"] = {
  startTurn: { line: ["Select", "amazons", "to move"] },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
    ],
  },
  move: {
    playercase: [
      {
        ifelse: [
          ["isFirstTurn"],
          {
            line: [
              { text: "Press " },
              "endTurn",
              {
                text: ` to submit your moves and hand over to `,
              },
              ["otherplayer"],
              {
                text: `(you don't get to fire the first turn)`,
              },
            ],
          },
          {
            line: [
              "Select where to fire with",
              { unitat: { turnpos: "movedto" } },
            ],
          },
        ],
      },
      {
        line: ["Select where to fire with", { unitat: { turnpos: "movedto" } }],
      },
    ],
  },
  selectfiretarget: {
    line: [
      "Press",
      "fire",
      "to spawn",
      { unittypepos: ["stones", ["player"], "selectfiretarget"] },
      {
        if: [
          { notempty: "victims" },
          { line: ["and capture", { unitlist: "victims" }] },
        ],
      },
    ],
  },
};

export default partisansInstructions;
