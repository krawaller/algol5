import { AmazonsFlow } from "./_types";

const amazonsFlow: AmazonsFlow = {
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetargets", link: "move" },
    selectfiretarget: { from: "firetargets", link: "fire" }
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      runGenerator: "findfiretargets",
      link: "selectfiretarget"
    },
    fire: {
      applyEffect: {
        spawnat: [
          "selectfiretarget",
          "fires",
          0,
          { from: { pos: { onlyin: "firedfrom" } } }
        ]
      },
      link: "endTurn"
    }
  }
};

export default amazonsFlow;
