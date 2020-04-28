import { YonmoqueDefinition } from "./_types";

const yonmoqueFlow: YonmoqueDefinition["flow"] = {
  startTurn: {
    links: [
      "selectunit",
      {
        if: [
          {
            morethan: [
              7,
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
      runGenerators: ["findsteptargets", "findslidetargets"],
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default yonmoqueFlow;
