import { MurusgallicusInstructions } from "./_types";

const murusgallicusInstructions: MurusgallicusInstructions = {
  startTurn: { line: ["Select", "towers", "to act with"] },
  selecttower: {
    line: [
      "Select",
      {
        orlist: [
          { if: [{ notempty: "movetargets" }, "a move target"] },
          {
            if: [
              { notempty: "killtargets" },
              {
                line: [
                  "a",
                  { unittype: ["walls", { playercase: [2, 1] }] },
                  "to kill"
                ]
              }
            ]
          }
        ]
      },
      "for",
      { unitat: "selecttower" }
    ]
  },
  selectmove: {
    line: [
      "Press",
      "move",
      "to overturn",
      { unitat: "selecttower" },
      ",",
      {
        andlist: [
          {
            if: [
              { notempty: "madewalls" },
              {
                line: [
                  "creating",
                  { unittypeset: ["walls", ["player"], "madewalls"] }
                ]
              }
            ]
          },
          {
            if: [
              { notempty: "madetowers" },
              {
                line: ["turning", { unitlist: "madetowers" }, "into", "towers"]
              }
            ]
          }
        ]
      }
    ]
  },
  selectkill: {
    line: [
      "Press",
      "kill",
      "to make a section of",
      { unitat: "selecttower" },
      "crush",
      { unitat: "selectkill" }
    ]
  }
};

export default murusgallicusInstructions;
