import { MadbishopsDefinition } from "./_types";

const madbishopsInstructions: MadbishopsDefinition["instructions"] = {
  startTurn: { line: ["Select", "bishops", "to move"] },
  selectunit: {
    ifelse: [
      { notempty: "killtargets" },
      {
        line: [
          "Since",
          { unitat: "selectunit" },
          "can reach",
          { unittype: ["bishops", ["otherplayer"]] },
          "you must",
          "select",
          "one to kill!",
        ],
      },
      {
        line: [
          "Select",
          "where",
          { unitat: "selectunit" },
          "should move to threaten a",
          { unittype: ["bishops", ["otherplayer"]] },
        ],
      },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to",
      {
        ifelse: [
          { anyat: ["oppunits", "selectmovetarget"] },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              "to kill",
              { unitat: "selectmovetarget" },
            ],
          },
          {
            line: [
              { text: "move" },
              { unitat: "selectunit" },
              "to",
              "selectmovetarget",
            ],
          },
        ],
      },
    ],
  },
};

export default madbishopsInstructions;
