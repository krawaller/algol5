import { SupportDefinition } from "./_types";

const supportInstructions: SupportDefinition["instructions"] = {
  startTurn: {
    line: [
      {
        ifelse: [
          {
            same: [5, { battlevar: { playercase: ["size2", "size1"] } }],
          },
          {
            line: [
              "You must kill one of the",
              { unittype: ["soldiers", ["otherplayer"]] },
              "in the center!",
            ],
          },
          {
            ifelse: [
              { same: [{ battlevar: "score1" }, { battlevar: "score2" }] },
              {
                line: [
                  "You and",
                  { player: ["otherplayer"] },
                  "both have",
                  { value: { battlevar: "score1" } },
                  "kills.",
                ],
              },
              {
                line: [
                  "You have",
                  {
                    value: { battlevar: { playercase: ["score1", "score2"] } },
                  },
                  "kills and",
                  { player: ["otherplayer"] },
                  "has",
                  {
                    value: { battlevar: { playercase: ["score2", "score1"] } },
                  },
                  ".",
                ],
              },
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
