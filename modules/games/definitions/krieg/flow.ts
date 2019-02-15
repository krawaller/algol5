import { KriegFlow } from './_types';

const kriegFlow: KriegFlow = {
  marks: {
    selectunit: {
      from: "mynotfrozens",
      runGenerator: "findmovetargets",
      link: "selectmove"
    },
    selectmove: { from: "movetargets", link: "move" }
  },
  startTurn: { link: "selectunit" },
  endGame: {
    cornerinfiltration: {
      condition: { overlaps: ["oppcorners", "myunits"] },
      show: { intersect: ["oppcorners", "myunits"] }
    },
    occupation: {
      condition: {
        same: [{ sizeof: { intersect: ["oppbases", "myunits"] } }, 2]
      },
      show: { intersect: ["oppbases", "myunits"] }
    }
  },
  commands: {
    move: {
      applyEffects: [
        { morphin: ["myfrozens", "notfrozens"] },
        { morphat: ["selectunit", "frozens"] },
        { moveat: ["selectunit", "selectmove"] }
      ],
      link: "endturn"
    }
  }
};

export default kriegFlow;
