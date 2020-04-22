import { NeutronDefinition } from "./_types";

const neutronInstructions: NeutronDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { and: [{ same: [["player"], 1] }, { same: [["turn"], 1] }] },
      {
        line: [
          "Select a",
          "soldiers",
          "to slide (first turn of the game you don't the",
          { unittype: ["soldiers", 0] },
          ")",
        ],
      },
      {
        line: ["Select where to move", { unitat: { onlyin: "neutralunits" } }],
      },
    ],
  },
  selectunit: { line: ["Select where to slide", { unitat: "selectunit" }] },
  selectmytarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: "selectunit" },
      "to",
      "selectmytarget",
    ],
  },
  selectneutraltarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: { onlyin: "neutralunits" } },
      "to",
      "selectneutraltarget",
    ],
  },
  slide: {
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
      { line: ["Now select which", "soldiers", "to move"] },
    ],
  },
};

export default neutronInstructions;
