import { PaperneutronDefinition } from "./_types";

const paperneutronInstructions: PaperneutronDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { and: [{ same: [["player"], 1] }, { same: [["turn"], 1] }] },
      {
        line: [
          "Select a",
          "soldiers",
          "to slide (first turn of the game you don't move any",
          { unittype: ["soldiers", 0] },
          ")",
        ],
      },
      {
        line: ["Select which", { unittype: ["soldiers", 0] }, "to move first"],
      },
    ],
  },
  selectmyunit: { line: ["Select where to slide", { unitat: "selectmyunit" }] },
  selectfirstneutron: {
    line: ["Select where to slide", { unitat: "selectfirstneutron" }],
  },
  selectfirstneutrontarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: "selectfirstneutron" },
      "to",
      "selectfirstneutrontarget",
    ],
  },
  selectsecondneutrontarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: { turnpos: "nextneutron" } },
      "to",
      "selectsecondneutrontarget",
    ],
  },
  selectmyunittarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: "selectmyunit" },
      "to",
      "selectmyunittarget",
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
      {
        ifelse: [
          { truthy: { turnvar: "neutronsdone" } },
          {
            line: ["Now select which of your", "soldiers", "to move"],
          },
          {
            line: [
              "Now you must select where to move the second",
              { unittype: ["soldiers", 0] },
            ],
          },
        ],
      },
    ],
  },
};

export default paperneutronInstructions;
