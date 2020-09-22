import { SaposDefinition } from "./_types";

const saposInstructions: SaposDefinition["instructions"] = {
  startTurn: {
    line: [
      {
        line: [
          "Your reserve is",
          { value: { battlevar: { playercase: ["plr1", "plr2"] } } },
          "and",
          ["otherplayer"],
          "has",
          { value: { battlevar: { playercase: ["plr2", "plr1"] } } },
          ".",
        ],
      },
      {
        ifelse: [
          { isempty: "knot" },
          {
            line: [
              "Select a",
              "toads",
              "to hop",
              {
                playercase: [
                  "or jump",
                  { if: [{ not: ["isFirstTurn"] }, "or jump"] },
                ],
              },
              "with",
            ],
          },
          {
            line: [
              "Select a",
              "toads",
              "in the knot to hop",
              {
                playercase: [
                  "or jump",
                  { if: [{ not: ["isFirstTurn"] }, "or jump"] },
                ],
              },
              "with",
            ],
          },
        ],
      },
    ],
  },
  selectunit: {
    playercase: [
      {
        line: [
          "Select a",
          "toads",
          "or",
          { unittype: ["toads", ["otherplayer"]] },
          "for",
          { unitat: "selectunit" },
          "to hop or jump over",
        ],
      },
      {
        ifelse: [
          ["isFirstTurn"],
          {
            line: [
              "Select a",
              "toads",
              "for",
              { unitat: "selectunit" },
              "to hop over",
            ],
          },
          {
            line: [
              "Select a",
              "toads",
              "or",
              { unittype: ["toads", ["otherplayer"]] },
              "for",
              { unitat: "selectunit" },
              "to hop or jump over",
            ],
          },
        ],
      },
    ],
  },
  selecthoptarget: {
    line: [
      "Press",
      "hop",
      "to move",
      { unitat: { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] } },
      "to",
      "selecthoptarget",
    ],
  },
  hop: {
    line: [
      "Select",
      {
        orlist: [
          { if: [{ notempty: "hoptargets" }, "a subsequent hop"] },
          {
            playercase: [
              { if: [{ notempty: "jumptargets" }, "a jump"] },
              {
                if: [
                  {
                    and: [
                      { not: ["isFirstTurn"] },
                      { notempty: "jumptargets" },
                    ],
                  },
                  "a jump",
                ],
              },
            ],
          },
          {
            if: [
              { notempty: "spawns" },
              { line: ["where to spawn a new", "toads"] },
            ],
          },
        ],
      },
    ],
  },
  spawn: {
    playercase: [
      {
        line: [
          "Press",
          "endTurn",
          "to submit your moves and hand over to",
          ["otherplayer"],
        ],
      },
      {
        ifelse: [
          {
            and: [
              {
                same: [{ turnvar: "spawns" }, 1],
              },
              ["isFirstTurn"],
            ],
          },
          {
            line: ["In the first turn", { player: 2 }, "has to hop again!"],
          },
          {
            line: [
              "Press",
              "endTurn",
              "to submit your moves and hand over to",
              ["otherplayer"],
            ],
          },
        ],
      },
    ],
  },
  jump: {
    ifelse: [
      { isempty: "jumptargets" },
      {
        line: [
          "Press",
          "endTurn",
          "to submit your moves and hand over to",
          ["otherplayer"],
        ],
      },
      {
        line: [
          "Select a subsequent jump or press",
          "endTurn",
          "to hand over to",
          ["otherplayer"],
        ],
      },
    ],
  },
  selectjumptarget: {
    line: [
      "Press",
      "jump",
      "to make",
      { unitat: { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] } },
      "jump to",
      "selectjumptarget",
      "and steal",
      {
        unitlist: "jumpvictims",
      },
      "to your reserve",
    ],
  },
  selectspawntarget: {
    line: [
      "Press",
      "spawn",
      "to place",
      { unittypepos: ["toads", ["player"], "selectspawntarget"] },
      "from your reserve",
    ],
  },
};

export default saposInstructions;
