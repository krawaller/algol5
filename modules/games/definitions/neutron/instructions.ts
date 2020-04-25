import { NeutronDefinition } from "./_types";

const neutronInstructions: NeutronDefinition["instructions"] = {
  startTurn: {
    ifelse: [
      { and: [{ same: [["player"], 1] }, { same: [["turn"], 1] }] },
      {
        line: [
          "Select a",
          "soldiers",
          "to slide (first turn you don't move",
          { unittype: ["soldiers", 0] },
          ")",
        ],
      },
      {
        ifrulesetelse: [
          "basic",
          {
            line: [
              "Select where to move",
              { unitat: { onlyin: "neutralunits" } },
            ],
          },
          {
            line: [
              "Select which",
              { unittype: ["soldiers", 0] },
              "to move first",
            ],
          },
        ],
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
  selectsingleneutrontarget: {
    line: [
      "Press",
      "slide",
      "to move",
      { unitat: { onlyin: "neutralunits" } },
      "to",
      "selectsingleneutrontarget",
    ],
  },
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
        ifrulesetelse: [
          "basic",
          { line: ["Now select which", "soldiers", "to move"] },
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
    ],
  },
};

export default neutronInstructions;
