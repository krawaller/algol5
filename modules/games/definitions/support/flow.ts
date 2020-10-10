import { SupportDefinition } from "./_types";

const supportFlow: SupportDefinition["flow"] = {
  battleVars: {
    plr1: 0,
    plr2: 0,
  },
  endGame: {
    killed18: {
      condition: {
        same: [{ battlevar: { playercase: ["plr1", "plr2"] } }, 18],
      },
      show: { single: "selectdestination" },
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
                  incbattlevar: [{ playercase: ["plr1", "plr2"] }],
                },
              ],
            },
          ],
        },
        {
          moveat: ["selectorigin", "selectdestination"],
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
                  incbattlevar: [{ playercase: ["plr1", "plr2"] }],
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
                "findconnected",
                "findmovetargets",
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
          { noneat: ["mysoldiers", "selectorigin"] },
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
        { if: [{ anyat: ["movetargets", "selectdestination"] }, "move"] },
        { if: [{ anyat: ["pushtargets", "selectdestination"] }, "insert"] },
      ],
    },
  },
};

export default supportFlow;
