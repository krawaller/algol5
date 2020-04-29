import { YonmoqueDefinition } from "./_types";

const yonmoqueFlow: YonmoqueDefinition["flow"] = {
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
