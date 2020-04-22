import { NeutronDefinition } from "./_types";

const neutronFlow: NeutronDefinition["flow"] = {
  endGame: {
    goal: {
      condition: { overlaps: ["neutralsoldiers", "mybase"] },
      show: { intersect: ["mybase", "neutralsoldiers"] },
    },
    suicide: {
      condition: { overlaps: ["neutralsoldiers", "oppbase"] },
      who: ["otherplayer"],
      show: { intersect: ["oppbase", "neutralsoldiers"] },
    },
  },
  startTurn: {
    runGenerator: "findneutraltargets",
    link: {
      playercase: [
        { ifelse: [["isFirstTurn"], "selectunit", "selectneutraltarget"] },
        "selectneutraltarget",
      ],
    },
  },
  commands: {
    slide: {
      applyEffect: {
        moveat: [
          { firsttruthy: ["selectunit", { onlyin: "neutralunits" }] },
          { firsttruthy: ["selectneutraltarget", "selectmytarget"] },
        ],
      },
      link: {
        ifelse: [{ truthypos: "selectunit" }, "endTurn", "selectunit"],
      },
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmytargets",
      link: "selectmytarget",
    },
    selectmytarget: {
      from: "mytargets",
      link: "slide",
    },
    selectneutraltarget: {
      from: "neutraltargets",
      link: "slide",
    },
  },
};

export default neutronFlow;
