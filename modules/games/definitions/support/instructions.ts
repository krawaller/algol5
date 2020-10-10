import { SupportDefinition } from "./_types";

const supportInstructions: SupportDefinition["instructions"] = {
  startTurn: {
    line: ["Select where to insert", "soldiers", "or a", "soldiers", "to move"],
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
