import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotInstructions: SpeedsoccolotDefinition["instructions"] = {
  startTurn: { line: ["Select which", "players", "to act with"] },
  selectunit: {
    line: [
      "Select where",
      "selectunit",
      "should",
      {
        orlist: [
          { if: [{ notempty: "runtargets" }, { text: "move" }] },
          { if: [{ notempty: "kicktargets" }, { text: "kick" }] },
        ],
      },
    ],
  },
  selectkicktarget: {
    line: [
      "Press",
      "kick",
      "to move",
      { unitat: { onlyin: "ball" } },
      "to",
      "selectkicktarget",
    ],
  },
  selectruntarget: {
    ifelse: [
      { not: { cmndavailable: "run" } },
      {
        line: [
          "Press",
          "dribble",
          "to move",
          { unitat: "selectunit" },
          "to",
          "selectruntarget",
          "and",
          { unitat: { onlyin: "ball" } },
          "to",
          { pos: { onlyin: "dribbletarget" } },
        ],
      },
      {
        line: [
          "Press",
          "run",
          "to move",
          { unitat: "selectunit" },
          "to",
          "selectruntarget",
          {
            if: [
              { cmndavailable: "dribble" },
              {
                line: [
                  "or",
                  "dribble",
                  "to also move",
                  { unitat: { onlyin: "ball" } },
                  "to",
                  { pos: { onlyin: "dribbletarget" } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default speedsoccolotInstructions;
