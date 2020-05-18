import { KachitknightDefinition } from "./_types";

const kachitknightFlow: KachitknightDefinition["flow"] = {
  endGame: {
    regicide: {
      condition: {
        and: [
          { isempty: "oppleader" },
          { isempty: "oppleaderdiag" },
          { isempty: "oppleaderortho" },
        ],
      },
      show: { single: "selectmovetarget" },
    },
    infiltration: {
      condition: {
        or: [
          { anyat: ["myleader", { onlyin: "oppthrone" }] },
          { anyat: ["myleaderortho", { onlyin: "oppthrone" }] },
          { anyat: ["myleaderdiag", { onlyin: "oppthrone" }] },
        ],
      },
      show: "oppthrone",
    },
  },
  startTurn: {
    links: [
      "selectunit",
      {
        if: [
          {
            morethan: [
              3,
              {
                firsttruthy: [
                  {
                    battlevar: { playercase: ["plr1knights", "plr2knights"] },
                  },
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
    step: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
    orthogonal: {
      applyEffects: [
        {
          if: [
            { truthypos: "selectdroptarget" },
            {
              multi: [
                {
                  incbattlevar: [
                    { playercase: ["plr1knights", "plr2knights"] },
                    1,
                  ],
                },
                { spawnat: ["selectdroptarget", "knightortho"] },
              ],
            },
          ],
        },
        {
          if: [
            { truthypos: "selectunit" },
            {
              multi: [
                {
                  if: [
                    {
                      or: [
                        { anyat: ["leader", "selectunit"] },
                        { anyat: ["leaderdiag", "selectunit"] },
                      ],
                    },
                    { morphat: ["selectunit", "leaderortho"] },
                  ],
                },
                {
                  if: [
                    { anyat: ["knightdiag", "selectunit"] },
                    { morphat: ["selectunit", "knightortho"] },
                  ],
                },
                { stompat: ["selectunit", "selectmovetarget"] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
    diagonal: {
      applyEffects: [
        {
          if: [
            { truthypos: "selectdroptarget" },
            {
              multi: [
                {
                  incbattlevar: [
                    { playercase: ["plr1knights", "plr2knights"] },
                    1,
                  ],
                },
                { spawnat: ["selectdroptarget", "knightdiag"] },
              ],
            },
          ],
        },
        {
          if: [
            { truthypos: "selectunit" },
            {
              multi: [
                {
                  if: [
                    {
                      or: [
                        { anyat: ["leader", "selectunit"] },
                        { anyat: ["leaderortho", "selectunit"] },
                      ],
                    },
                    { morphat: ["selectunit", "leaderdiag"] },
                  ],
                },
                {
                  if: [
                    { anyat: ["knightortho", "selectunit"] },
                    { morphat: ["selectunit", "knightdiag"] },
                  ],
                },
                { stompat: ["selectunit", "selectmovetarget"] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerators: [
        {
          if: [
            {
              or: [
                { anyat: ["myleader", "selectunit"] },
                { anyat: ["myleaderortho", "selectunit"] },
                { anyat: ["myleaderdiag", "selectunit"] },
              ],
            },
            "findsteptargets",
          ],
        },
        {
          if: [
            {
              or: [
                { anyat: ["myleaderortho", "selectunit"] },
                { anyat: ["myknightortho", "selectunit"] },
              ],
            },
            "findorthotargets",
          ],
        },
        {
          if: [
            {
              or: [
                { anyat: ["myleaderdiag", "selectunit"] },
                { anyat: ["myknightdiag", "selectunit"] },
              ],
            },
            "finddiagtargets",
          ],
        },
      ],
      link: "selectmovetarget",
    },
    selectdroptarget: {
      from: { subtract: ["mybase", "units"] },
      links: ["orthogonal", "diagonal"],
    },
    selectmovetarget: {
      from: "movetargets",
      link: {
        ifelse: [
          {
            and: [
              { anyat: ["leader", "selectunit"] },
              { noneat: ["promotion", "selectmovetarget"] },
            ],
          },
          "step",
          { multi: ["orthogonal", "diagonal"] },
        ],
      },
    },
  },
};

export default kachitknightFlow;
