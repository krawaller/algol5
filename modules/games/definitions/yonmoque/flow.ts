import { YonmoqueDefinition } from "./_types";

const yonmoqueFlow: YonmoqueDefinition["flow"] = {
  endGame: {
    fiveinarow: {
      condition: { notempty: "loseline" },
      who: ["otherplayer"],
      show: "loseline",
      prio: 1,
    },
    fourinarow: {
      condition: { notempty: "winline" },
      show: "winline",
      unlessAction: "drop",
      prio: 2,
    },
  },
  startTurn: {
    links: [
      "selectunit",
      {
        if: [
          {
            morethan: [
              6,
              {
                firsttruthy: [
                  { battlevar: { playercase: ["plr1drop", "plr2drop"] } },
                  0,
                ],
              },
            ],
          },
          "selectdroptarget",
        ],
      },
    ],
  },
  commands: {
    drop: {
      applyEffects: [
        {
          incbattlevar: [{ playercase: ["plr1drop", "plr2drop"] }],
        },
        {
          spawnat: [
            "selectdroptarget",
            {
              ifelse: [
                { anyat: ["mybase", "selectdroptarget"] },
                "bishops",
                "pawns",
              ],
            },
          ],
        },
      ],
      runGenerator: "findloselines",
      link: "endTurn",
    },
    move: {
      applyEffects: [
        {
          if: [
            {
              and: [
                { anyat: ["mybishops", "selectunit"] },
                { noneat: ["mybase", "selectmovetarget"] },
              ],
            },
            { morphat: ["selectunit", "pawns"] },
          ],
        },
        {
          if: [
            {
              and: [
                { anyat: ["mypawns", "selectunit"] },
                { anyat: ["mybase", "selectmovetarget"] },
              ],
            },
            { morphat: ["selectunit", "bishops"] },
          ],
        },
        { moveat: ["selectunit", "selectmovetarget"] },
        { adoptin: ["conversions"] },
        { morphin: ["promote", "bishops"] },
        { morphin: ["demote", "pawns"] },
      ],
      runGenerators: [
        "findloselines",
        {
          if: [
            { isempty: "loseline" },
            { multi: ["findwinlinestarts", "findwinlines"] },
          ],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectdroptarget: {
      from: { subtract: ["board", "units"] },
      link: "drop",
    },
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findsteptargets",
        { if: [{ anyat: ["bishops", "selectunit"] }, "findslidetargets"] },
      ],
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findconversions",
      link: "move",
    },
  },
};

export default yonmoqueFlow;
