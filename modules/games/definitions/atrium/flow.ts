import { AtriumDefinition } from "./_types";

const atriumFlow: AtriumDefinition["flow"] = {
  endGame: {
    winline: { condition: { notempty: "winline" }, show: "winline", prio: 1 },
    loseline: {
      condition: { notempty: "loseline" },
      show: "loseline",
      prio: 2,
      who: ["otherplayer"],
    },
  },
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: {
        if: [{ anyat: ["units", "selectmovetarget"] }, "findpushees"],
      },
      link: {
        if: [
          {
            or: [
              { noneat: ["units", "selectmovetarget"] },
              {
                and: [
                  { notempty: "pushees" },
                  {
                    not: {
                      and: [
                        {
                          samepos: [
                            "selectunit",
                            { battlepos: "forbiddenpusher" },
                          ],
                        },
                        {
                          samepos: [
                            "selectmovetarget",
                            { battlepos: "forbiddenpushtarget" },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          "move",
        ],
      },
    },
  },
  commands: {
    move: {
      applyEffects: [
        {
          setbattlevar: [
            "pushdir",
            { read: ["movetargets", "selectmovetarget", "dir"] },
          ],
        },
        {
          ifelse: [
            { notempty: "pushees" },
            {
              multi: [
                {
                  setbattlepos: [
                    "forbiddenpushtarget",
                    { onlyin: "lastpushee" },
                  ],
                },
                {
                  setbattlepos: [
                    "forbiddenpusher",
                    {
                      offset: [
                        { onlyin: "lastpushee" },
                        { battlevar: "pushdir" },
                        1,
                      ],
                    },
                  ],
                },
                {
                  pushin: ["pushees", { battlevar: "pushdir" }],
                },
              ],
            },
            {
              multi: [
                { setbattlepos: ["forbiddenpusher", { onlyin: "lastpushee" }] },
                {
                  setbattlepos: [
                    "forbiddenpushtarget",
                    { onlyin: "lastpushee" },
                  ],
                },
              ],
            },
          ],
        },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      runGenerators: ["findwinlines", "findloselines"],
      link: "endTurn",
    },
  },
};

export default atriumFlow;
