import { DesdemonaDefinition } from "./_types";

const desdemonaInstructions: DesdemonaDefinition["instructions"] = {
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
    line: ["Select where to fire with", { unitat: { turnpos: "movedto" } }],
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
  fire: {
    ifelse: [
      { and: [{ notempty: "mymovers" }, { isempty: "oppmovers" }] },
      {
        line: [
          "Since your opponent is blocked you get to move again! Select",
          "amazons",
          "to move",
        ],
      },
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
    ],
  },
};

export default desdemonaInstructions;
