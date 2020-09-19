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
            { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] },
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
        "selectjumptarget",
      ],
    },
    jump: {
      applyEffects: [
        {
          moveat: [
            { firsttruthy: [{ turnpos: "skippedto" }, "selectunit"] },
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
      runGenerator: "findjumptargets",
      links: ["selectjumptarget", "endTurn"],
    },
    spawn: {
      applyEffects: [
        { spawnat: ["selectspawntarget", "toads"] },
        { incbattlevar: [{ playercase: ["plr1", "plr2"] }, -1] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: { ifelse: [{ isempty: "knot" }, "myunits", "knot"] },
      runGenerators: ["findhoptargets", "findjumptargets"],
      links: ["selecthoptarget", "selectjumptarget"],
    },
    selecthoptarget: {
      from: "hoptargets",
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
