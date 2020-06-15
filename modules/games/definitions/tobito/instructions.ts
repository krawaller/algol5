import { TobitoDefinition } from "./_types";

const tobitoInstructions: TobitoDefinition["instructions"] = {
  startTurn: {
    line: ["Select a", { unittype: ["runners", ["player"]] }, "to move"],
  },
  selectunit: { line: ["Select where to move", { unitat: "selectunit" }] },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmovetarget",
      {
        if: [
          { anyat: ["oppbase", "selectmovetarget"] },
          {
            line: [
              ", reaching the goal and turning it into",
              { unittype: ["finishers", ["player"]] },
            ],
          },
        ],
      },
    ],
  },
  move: {
    ifelse: [
      ["canEndTurn"],
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          ["otherplayer"],
        ],
      },
      {
        line: [
          "Select a jumped",
          { unittype: ["runners", ["otherplayer"]] },
          "to relocate",
        ],
      },
    ],
  },
  relocate: {
    ifelse: [
      ["canEndTurn"],
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          ["otherplayer"],
        ],
      },
      {
        line: [
          "Select another jumped",
          { unittype: ["runners", ["otherplayer"]] },
          "to relocate",
        ],
      },
    ],
  },
  selectrelocatee: {
    line: [
      "Select an empty square to relocate",
      { unitat: "selectrelocatee" },
      "to",
    ],
  },
  selectrelocationtarget: {
    line: [
      "Press",
      "relocate",
      "to move",
      { unitat: "selectrelocatee" },
      "to",
      "selectrelocationtarget",
    ],
  },
};

export default tobitoInstructions;
