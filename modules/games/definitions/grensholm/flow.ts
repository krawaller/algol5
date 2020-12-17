import { GrensholmDefinition } from "./_types";

const grensholmFlow: GrensholmDefinition["flow"] = {
  startTurn: { link: "selectunit" },
  endGame: {
    kinghome: {
      condition: { overlaps: ["mykings", "myhomerow"] },
      show: { intersect: ["mykings", "myhomerow"] }
    }
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            { anyat: ["opphomerow", "selectmovetarget"] },
            { morphat: ["selectunit", "kings"] }
          ]
        },
        { stompat: ["selectunit", "selectmovetarget"] }
      ],
      link: "endTurn"
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetargets", link: "move" }
  }
};

export default grensholmFlow;
