import { MonkeyqueenDefinition } from "./_types";

const monkeyqueenFlow: MonkeyqueenDefinition["flow"] = {
  endGame: {
    regicide: {
      condition: { isempty: "oppqueens" },
      show: { single: "selectmovetarget" },
    },
  },
  battleVars: {
    plr1life: 20,
    plr2life: 20,
  },
  startTurn: {
    links: ["selectunit", { ifplayer: [2, { if: [["isFirstTurn"], "pie"] }] }],
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            {
              and: [
                { anyat: ["myqueens", "selectunit"] },
                { noneat: ["units", "selectmovetarget"] },
              ],
            },
            {
              multi: [
                { spawnat: ["selectunit", "babies"] },
                {
                  incbattlevar: [{ playercase: ["plr1life", "plr2life"] }, -1],
                },
              ],
            },
          ],
        },
        { stompat: ["selectunit", "selectmovetarget"] },
      ],
      link: "endTurn",
    },
    pie: {
      applyEffects: [
        { adoptin: ["myunits", ["otherplayer"]] },
        { adoptin: ["oppunits", ["player"]] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default monkeyqueenFlow;
