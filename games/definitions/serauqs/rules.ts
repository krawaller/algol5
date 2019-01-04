import {Definition} from '../../types';
import { SerauqsArtifactLayer, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsUnit } from './_types';

const serauqsRules: Definition<SerauqsArtifactLayer, SerauqsCommand, SerauqsGenerator, SerauqsLayer, SerauqsMark, SerauqsUnit> = {
  endGame: {
    madeline: {
      condition: ["notempty", "winline"],
      show: "winline"
    },
    madex: {
      condition: ["morethan", ["sizeof", ["intersect", "corners", ["union", "myunits", "oppwild"]]], 3],
      show: "corners"
    },
    tookcenter: {
      condition: ["morethan", ["sizeof", ["intersect", "middle", ["union", "myunits", "oppwild"]]], 3],
      show: "middle"
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: ["ifelse", ["morethan", 3, ["turn"]], "promote", "selectmovetarget"]
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move"
    }
  },
  commands: {
    promote: {
      applyEffect: ["setat", "selectunit", "group", "wild"],
      link: "endturn"
    },
    move: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      runGenerator: "findwinline",
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      unlessover: "units",
      draw: {
        neighbours: {
          tolayer: "movetargets"
        }
      }
    },
    findwinline: {
      type: "walker",
      starts: ["union", "myunits", "oppwild"],
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      steps: ["union", "myunits", "oppwild"],
      count: "mybase",
      startasstep: true,
      draw: {
        steps: {
          condition: ["and", ["same", ["walklength"], 4],
            ["different", ["totalcount"], 4]
          ],
          tolayer: "winline"
        }
      }
    }
  }
};

export default serauqsRules;
