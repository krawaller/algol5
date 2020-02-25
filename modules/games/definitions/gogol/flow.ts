import { GogolFlow } from "./_types";

const gogolFlow: GogolFlow = {
  startTurn: {
    runGenerators: ["findforbiddenkingspots", "findforbiddensoldierspots"],
    link: {
      ifelse: [{ morethan: [["turn"], 1] }, "selectunit", "selectkingdeploy"],
    },
  },
  marks: {
    selectkingdeploy: {
      from: { subtract: ["board", { union: ["units", "nokings"] }] },
      link: "deploy",
    },
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findkingwalktargets",
        "findadjacentenemies",
        "findjumptargets",
      ],
      links: ["selectmovetarget", "selectjumptarget"],
    },
    selectmovetarget: {
      from: {
        ifelse: [
          { anyat: ["mykings", "selectunit"] },
          "kingwalk",
          {
            subtract: [
              "board",
              { union: ["units", "nosoldiers", "jumptargets"] },
            ],
          },
        ],
      },
      link: "move",
    },
    selectjumptarget: {
      from: "jumptargets",
      runGenerator: "findsplashed",
      link: "jump",
    },
  },
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectkingdeploy", "kings"] },
      link: "endTurn",
    },
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      link: "endTurn",
    },
    jump: {
      applyEffects: [
        { killat: { onlyin: "splashed" } },
        { moveat: ["selectunit", "selectjumptarget"] },
      ],
      link: "endTurn",
    },
  },
  endGame: {
    infiltration: {
      condition: { overlaps: ["mykings", "opphomerow"] },
      show: { intersect: ["mykings", "opphomerow"] },
    },
    regicide: {
      condition: {
        and: [{ morethan: [["turn"], 1] }, { isempty: "oppkings" }],
      },
    },
  },
};

export default gogolFlow;
