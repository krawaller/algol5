import { MurusgallicusadvancedInstructions } from "./_types";

const murusgallicusadvancedInstructions: MurusgallicusadvancedInstructions = {
  startTurn: {
    line: ["Select", "towers", "or", "catapults", "to act with"]
  },
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
          },
          {
            if: [
              { notempty: "madecatapults" },
              {
                line: [
                  "turning",
                  { unitlist: "madecatapults" },
                  "into",
                  "catapults"
                ]
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
      "to turn",
      { unitat: "selecttower" },
      "to a",
      "walls",
      "and",
      {
        ifelse: [
          { anyat: ["walls", "selectkill"] },
          { line: ["destroy", { unitat: "selectkill" }] },
          {
            line: [
              "reduce",
              { unitat: "selectkill" },
              "to a",
              { unittype: ["towers", { playercase: [2, 1] }] },
              ", or",
              "sacrifice",
              { unitat: "selecttower" },
              "entirely to reduce",
              { unitat: "selectkill" },
              "to a",
              { unittype: ["walls", { playercase: [2, 1] }] },
              "!"
            ]
          }
        ]
      }
    ]
  },
  selectcatapult: {
    line: [
      "Select",
      "where to fire the top section of",
      { unitat: "selectcatapult" }
    ]
  },
  selectfire: {
    line: [
      "Press",
      "fire",
      "to turn",
      { unitat: "selectcatapult" },
      "into a",
      "towers",
      {
        ifelse: [
          { anyat: ["walls", "selectfire"] },
          { line: ["and destroy", { unitat: "selectfire" }] },
          {
            ifelse: [
              { anyat: ["units", "selectfire"] },
              {
                line: [
                  "and reduce",
                  { unitat: "selectfire" },
                  "to a",
                  {
                    ifelse: [
                      { anyat: ["catapults", "selectfire"] },
                      { unittype: ["towers", { playercase: [2, 1] }] },
                      { unittype: ["walls", { playercase: [2, 1] }] }
                    ]
                  }
                ]
              },
              {
                line: [
                  "and spawn",
                  { unittypepos: ["walls", ["player"], "selectfire"] }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default murusgallicusadvancedInstructions;
