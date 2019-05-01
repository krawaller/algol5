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
              { notempty: "crushtargets" },
              {
                line: [
                  "a",
                  { unittype: ["walls", { playercase: [2, 1] }] },
                  "or",
                  { unittype: ["catapults", { playercase: [2, 1] }] },
                  "to crush"
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
  selectcrush: {
    line: [
      "Press",
      "crush",
      "to turn",
      { unitat: "selecttower" },
      "to a",
      "walls",
      "and",
      {
        ifelse: [
          { anyat: ["walls", "selectcrush"] },
          { line: ["destroy", { unitat: "selectcrush" }] },
          {
            line: [
              "reduce",
              { unitat: "selectcrush" },
              "to a",
              { unittype: ["towers", { playercase: [2, 1] }] },
              ", or",
              "sacrifice",
              { unitat: "selecttower" },
              "entirely to reduce",
              { unitat: "selectcrush" },
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
