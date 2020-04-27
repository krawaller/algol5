import { ScatterDefinition } from "./_types";

const scatterFlow: ScatterDefinition["flow"] = {
  startTurn: {
    runGenerators: [
      "findeasttargets",
      "findnorthtargets",
      "findsouthtargets",
      "findwesttargets",
    ],
    links: [
      "selectunit",
      {
        if: [
          {
            and: [
              { notempty: "northtargets" },
              { different: [{ battlevar: "noshift" }, "north"] },
            ],
          },
          "north",
        ],
      },
      {
        if: [
          {
            and: [
              { notempty: "southtargets" },
              { different: [{ battlevar: "noshift" }, "south"] },
            ],
          },
          "south",
        ],
      },
      {
        if: [
          {
            and: [
              { notempty: "easttargets" },
              { different: [{ battlevar: "noshift" }, "east"] },
            ],
          },
          "east",
        ],
      },
      {
        if: [
          {
            and: [
              { notempty: "westtargets" },
              { different: [{ battlevar: "noshift" }, "west"] },
            ],
          },
          "west",
        ],
      },
    ],
  },
  endGame: {
    scatter: {
      condition: {
        valinlist: [
          { gridin: ["binary", "myunits"] },
          510,
          509,
          507,
          503,
          495,
          479,
          447,
          383,
          255,
        ],
      },
      show: "myunits",
    },
  },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectunit", "selectmovetarget"] },
        { setbattlevar: ["noshift", 0] },
      ],
      link: "endTurn",
    },
    north: {
      applyEffects: [
        { pushin: ["neutralunits", "d1f2r0"] },
        { pushin: ["northtargets", "d5f2r0"] },
        { setbattlevar: ["noshift", "south"] },
      ],
      link: "endTurn",
    },
    east: {
      applyEffects: [
        { pushin: ["neutralunits", "d3f2r0"] },
        { pushin: ["easttargets", "d7f2r0"] },
        { setbattlevar: ["noshift", "west"] },
      ],
      link: "endTurn",
    },
    south: {
      applyEffects: [
        { pushin: ["neutralunits", "d5f2r0"] },
        { pushin: ["southtargets", "d1f2r0"] },
        { setbattlevar: ["noshift", "north"] },
      ],
      link: "endTurn",
    },
    west: {
      applyEffects: [
        { pushin: ["neutralunits", "d7f2r0"] },
        { pushin: ["westtargets", "d3f2r0"] },
        { setbattlevar: ["noshift", "east"] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default scatterFlow;
