import { SaposDefinition } from "./_types";

const saposFlow: SaposDefinition["flow"] = {
  battleVars: {
    plr1: 12,
    plr2: 12,
  },
  startTurn: {
    runGenerator: "findknots",
    link: "selectunit",
  },
  commands: {
    hop: {
      applyEffects: [
        {
          moveat: [
            { firsttruthy: ["selectunit", { turnpos: "skippedto" }] },
            "selecthoptarget",
          ],
        },
        { setturnpos: ["skippedto", "selecthoptarget"] },
      ],
      purge: ["hoptargets"],
      runGenerators: ["findhoptargets", "findspawns", "findjumptargets"],
      links: [
        {
          if: [
            { truthy: { battlevar: { playercase: ["plr1", "plr2"] } } },
            "selectspawntarget",
          ],
        },
        "selecthoptarget",
        {
          playercase: [
            "selectjumptarget",
            { if: [{ not: ["isFirstTurn"] }, "selectjumptarget"] },
          ],
        },
      ],
    },
    jump: {
      applyEffects: [
        {
          moveat: [
            { firsttruthy: ["selectunit", { turnpos: "skippedto" }] },
            "selectjumptarget",
          ],
        },
        {
          killat: {
            onlyin: "jumpvictims",
          },
        },
        { incbattlevar: [{ playercase: ["plr1", "plr2"] }, 1] },
        { incbattlevar: [{ playercase: ["plr2", "plr1"] }, -1] },
        { setturnpos: ["skippedto", "selectjumptarget"] },
      ],
      purge: ["jumptargets"],
      runGenerators: ["findjumptargets"],
      links: ["selectjumptarget", "endTurn"],
    },
    spawn: {
      applyEffects: [
        { spawnat: ["selectspawntarget", "toads"] },
        { incbattlevar: [{ playercase: ["plr1", "plr2"] }, -1] },
        {
          ifplayer: [
            2,
            {
              multi: [
                { incturnvar: ["spawns"] },
                { setturnvar: ["skippedto", 0] },
              ],
            },
          ],
        },
      ],
      purge: ["jumptargets", "knot", "hoptargets", "forbidden"],
      link: {
        playercase: [
          "endTurn",
          {
            ifelse: [
              {
                and: [
                  ["isFirstTurn"],
                  {
                    same: [{ turnvar: "spawns" }, 1],
                  },
                ],
              },
              "selectunit",
              "endTurn",
            ],
          },
        ],
      },
    },
  },
  marks: {
    selectunit: {
      from: { ifelse: [{ isempty: "knot" }, "myunits", "knot"] },
      runGenerators: [
        "findhoptargets",
        {
          playercase: [
            "findjumptargets",
            { if: [{ not: ["isFirstTurn"] }, "findjumptargets"] },
          ],
        },
      ],
      purge: ["knot", "hoptargets"],
      links: ["selecthoptarget", "selectjumptarget"],
    },
    selecthoptarget: {
      from: "hoptargets",
      purge: ["jumpvictims", "jumptargets"],
      link: "hop",
    },
    selectjumptarget: {
      from: "jumptargets",
      purge: ["jumpvictims"],
      runGenerator: "findjumpvictims",
      link: "jump",
    },
    selectspawntarget: {
      from: "spawns",
      link: "spawn",
    },
  },
};

export default saposFlow;
