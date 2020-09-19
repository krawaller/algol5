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
          { line: ["Select any", "toads", "to hop or jump with"] },
          { line: ["Select a", "toads", "to hop or jump out of the knot"] },
        ],
      },
    ],
  },
  selectunit: {
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
          { if: [{ notempty: "jumptargets" }, "a jump"] },
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
