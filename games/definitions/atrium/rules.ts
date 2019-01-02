import {Definition} from '../../types';
import { AtriumTerrain, AtriumUnit } from './_types';

const atriumRules: Definition<AtriumTerrain, AtriumUnit> = {
  endGame: {
    madewinline: {
      condition: ["notempty", "winline"],
      show: "winline"
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      runGenerator: "findwinlines",
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      dirs: [1, 3, 5, 7],
      unlessover: "units",
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    },
    findwinlines: {
      type: "walker",
      starts: "myunits",
      startasstep: true,
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      steps: ["ifelse", ["anyat", "mykings", ["start"]], "mykings", "myqueens"],
      draw: {
        steps: {
          condition: ["same", ["walklength"], 3],
          tolayer: "winline"
        }
      }
    }
  }
};

export default atriumRules;
