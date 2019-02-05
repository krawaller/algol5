import { AmazonsFlow } from "./_types";

const amazonsFlow: AmazonsFlow = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findtargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      nodeadends: true,
      from: "targets",
      link: "move"
    },
    selectfiretarget: {
      from: "targets",
      link: "fire"
    }
  },
  commands: {
    move: {
      applyEffects: [
        { moveat: ["selectunit", "selectmovetarget"] },
        { setturnpos: ["movedto", "selectmovetarget"] }
      ],
      runGenerator: "findtargets",
      link: "selectfiretarget"
    },
    fire: {
      applyEffect: {
        spawnat: [
          "selectfiretarget",
          "fires",
          0,
          {
            from: { pos: { turnpos: "movedto" } }
          }
        ]
      },
      link: "endturn"
    }
  }
};

export default amazonsFlow;
