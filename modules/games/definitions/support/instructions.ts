import { SupportDefinition } from "./_types";

const supportInstructions: SupportDefinition["instructions"] = {
  startTurn: {
    line: [
      {
        ifelse: [
          { same: [{ battlevar: "plr1" }, { battlevar: "plr2" }] },
          {
            line: [
              "You and",
              { player: ["otherplayer"] },
              "both have",
              { value: { battlevar: "plr1" } },
              "kills.",
            ],
          },
          {
            line: [
              "You have",
              { value: { battlevar: { playercase: ["plr1", "plr2"] } } },
              "kills and",
              { player: ["otherplayer"] },
              "has",
              { value: { battlevar: { playercase: ["plr2", "plr1"] } } },
              ".",
            ],
          },
        ],
      },
      "Select where to insert or a",
      "soldiers",
      "to move",
    ],
  },
  selectorigin: {
    ifelse: [
      { noneat: ["units", "selectorigin"] },
      {
        line: [
          "Press",
          "insert",
          "to spawn",
          { unittypepos: ["soldiers", ["player"], "selectorigin"] },
        ],
      },
      {
        line: [
          "Select",
          {
            orlist: [
              {
                if: [
                  { notempty: "movetargets" },
                  { line: ["where to move", { unitat: "selectorigin" }] },
                ],
              },
              {
                if: [
                  { notempty: "pushtargets" },
                  { line: ["where to push from", "selectorigin"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  selectdestination: {
    line: [
      "Press",
      {
        orlist: [
          {
            if: [
              { anyat: ["movetargets", "selectdestination"] },
              {
                line: [
                  "move",
                  "to make",
                  { unitat: "selectorigin" },
                  {
                    ifelse: [
                      { anyat: ["units", "selectdestination"] },
                      { line: ["go kill", { unitat: "selectdestination" }] },
                      { line: ["go to", "selectdestination"] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            if: [
              { anyat: ["pushtargets", "selectdestination"] },
              {
                line: [
                  "insert",
                  "to spawn",
                  { unittypepos: ["soldiers", ["player"], "selectorigin"] },
                  "and push",
                  { unitlist: "pushees" },
                  {
                    ifelse: [
                      { anyat: ["units", "selectdestination"] },
                      { line: ["to kill", { unitat: "selectdestination" }] },
                      { line: ["towards", "selectdestination"] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default supportInstructions;
