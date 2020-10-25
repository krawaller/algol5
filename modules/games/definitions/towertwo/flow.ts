import { TowertwoDefinition } from "./_types";

const towertwoFlow: TowertwoDefinition["flow"] = {
  battleVars: {
    plr1wounded: 0,
    plr2wounded: 0,
  },
  endGame: {
    occupybases: {
      condition: { isempty: { subtract: ["oppbase", "myunits"] } },
      show: "oppbase",
    },
  },
  startTurn: {
    links: [
      "selectsource",
      {
        if: [
          {
            truthy: {
              battlevar: { playercase: ["plr1wounded", "plr2wounded"] },
            },
          },
          "heal",
        ],
      },
    ],
  },
  commands: {
    heal: {
      applyEffects: [
        { incbattlevar: [{ playercase: ["plr1wounded", "plr2wounded"] }, -1] },
        { incturnvar: ["spent"] },
      ],
      link: {
        ifelse: [
          { morethan: [{ turnvar: "spent" }, 2] },
          "endTurn",
          "selectsource",
        ],
      },
    },
    deploy: {
      applyEffects: [
        { incturnvar: ["spent"] },
        { spawnat: ["selectsource", "soldiers"] },
        { killin: "victims" },
        {
          incbattlevar: [
            { playercase: ["plr2wounded", "plr1wounded"] },
            { sizeof: "victims" },
          ],
        },
      ],
      link: {
        ifelse: [
          { morethan: [{ turnvar: "spent" }, 2] },
          "endTurn",
          "selectsource",
        ],
      },
    },
    move: {
      applyEffects: [
        {
          incturnvar: [
            "spent",
            { read: ["movetargets", "selectmovetarget", "dist"] },
          ],
        },
        { moveat: ["selectsource", "selectmovetarget"] },
        { killin: "victims" },
        {
          incbattlevar: [
            { playercase: ["plr2wounded", "plr1wounded"] },
            { sizeof: "victims" },
          ],
        },
      ],
      link: {
        ifelse: [
          { morethan: [{ turnvar: "spent" }, 2] },
          "endTurn",
          "selectsource",
        ],
      },
    },
  },
  marks: {
    selectsource: {
      from: {
        ifelse: [
          {
            morethan: [
              8,
              {
                sum: [
                  { battlevar: { playercase: ["plr1wounded", "plr2wounded"] } },
                  { sizeof: "myunits" },
                ],
              },
            ],
          },
          { union: [{ subtract: ["mybase", "units"] }, "myunits"] },
          "myunits",
        ],
      },
      runGenerators: [
        {
          if: [{ anyat: ["myunits", "selectsource"] }, "findmovetargets"],
        },
        {
          if: [{ noneat: ["units", "selectsource"] }, "findvictims"],
        },
      ],
      links: [
        {
          if: [{ anyat: ["myunits", "selectsource"] }, "selectmovetarget"],
        },
        {
          if: [{ noneat: ["units", "selectsource"] }, "deploy"],
        },
      ],
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findvictims",
      link: "move",
    },
  },
};

export default towertwoFlow;
