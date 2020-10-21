import { SupportDefinition } from "./_types";

const supportFlow: SupportDefinition["flow"] = {
  battleVars: {
    score1: 0,
    score2: 0,
    size1: 0,
    size2: 0,
  },
  endGame: {
    killed18: {
      condition: {
        same: [{ battlevar: { playercase: ["score1", "score2"] } }, 18],
      },
      show: { single: "selectdestination" },
    },
    tookcenter: {
      condition: {
        same: [{ battlevar: { playercase: ["size1", "size2"] } }, 5],
      },
      show: { intersect: ["center", "mysoldiers"] },
      whenStarvation: true,
    },
  },
  startTurn: {
    runGenerator: {
      if: [["false"], "findpushees"],
    },
    link: "selectorigin",
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            { anyat: ["units", "selectdestination"] },
            {
              multi: [
                {
                  killat: "selectdestination",
                },
                {
                  incbattlevar: [{ playercase: ["score1", "score2"] }],
                },
                {
                  if: [
                    { anyat: ["center", "selectdestination"] },
                    { incbattlevar: [{ playercase: ["size2", "size1"] }, -1] },
                  ],
                },
              ],
            },
          ],
        },
        {
          moveat: ["selectorigin", "selectdestination"],
        },
        {
          if: [
            { anyat: ["center", "selectdestination"] },
            { incbattlevar: [{ playercase: ["size1", "size2"] }] },
          ],
        },
      ],
      link: "endTurn",
    },
    insert: {
      applyEffects: [
        {
          if: [
            { anyat: ["units", "selectdestination"] },
            {
              multi: [
                {
                  killat: "selectdestination",
                },
                {
                  incbattlevar: [{ playercase: ["score1", "score2"] }],
                },
                {
                  if: [
                    { anyat: ["center", "selectdestination"] },
                    { incbattlevar: [{ playercase: ["size2", "size1"] }, -1] },
                  ],
                },
              ],
            },
          ],
        },

        {
          pushin: [
            "pushees",
            { read: ["pushtargets", "selectdestination", "dir"] },
          ],
        },
        {
          spawnat: ["selectorigin", "soldiers"],
        },
        {
          if: [
            { anyat: ["center", "selectdestination"] },
            { incbattlevar: [{ playercase: ["size1", "size2"] }] },
          ],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectorigin: {
      from: { union: ["mysoldiers", { subtract: ["edge", "oppunits"] }] },
      runGenerators: [
        {
          if: [
            { anyat: ["mysoldiers", "selectorigin"] },
            {
              multi: [
                {
                  if: [
                    { anyat: ["mysupported", "selectorigin"] },
                    { multi: ["findconnected", "findmovetargets"] },
                  ],
                },
                {
                  if: [{ anyat: ["edge", "selectorigin"] }, "findpushtargets"],
                },
              ],
            },
          ],
        },
      ],
      link: {
        ifelse: [
          {
            and: [
              { noneat: ["mysoldiers", "selectorigin"] },
              {
                different: [
                  5,
                  { battlevar: { playercase: ["size2", "size1"] } },
                ],
              },
            ],
          },
          "insert",
          "selectdestination",
        ],
      },
    },
    selectdestination: {
      from: { union: ["movetargets", "pushtargets"] },
      runGenerator: {
        if: [{ anyat: ["pushtargets", "selectdestination"] }, "findpushees"],
      },
      links: [
        {
          if: [
            {
              or: [
                {
                  different: [
                    5,
                    { battlevar: { playercase: ["size2", "size1"] } },
                  ],
                },
                {
                  and: [
                    { anyat: ["center", "selectdestination"] },
                    { anyat: ["oppunits", "selectdestination"] },
                  ],
                },
              ],
            },
            {
              multi: [
                {
                  if: [{ anyat: ["movetargets", "selectdestination"] }, "move"],
                },
                {
                  if: [
                    { anyat: ["pushtargets", "selectdestination"] },
                    "insert",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export default supportFlow;
