import {Definition} from '../../types';
import { DescentTerrain, DescentUnit } from './_types';

const descentRules: Definition<DescentTerrain, DescentUnit> = {
  endGame: {
    madeline: {
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
    },
    selectdigtarget: {
      from: "digtargets",
      link: "dig"
    }
  },
  commands: {
    move: {
      runGenerator: "finddigtargets",
      applyEffects: [
        ["setturnpos", "movedto", "selectmovetarget"],
        ["setturnvar", "heightfrom", ["read", "units", "selectunit", "group"]],
        ["setturnvar", "heightto", ["read", "units", "selectmovetarget", "group"]],
        ["setat", "selectunit", "group", ["turnvar", "heightto"]],
        ["killat", "selectmovetarget"],
        ["moveat", "selectunit", "selectmovetarget"],
        ["spawn", "selectunit", ["turnvar", "heightfrom"], 0]
      ],
      link: "selectdigtarget"
    },
    dig: {
      applyEffect: ["ifelse", ["anyat", "pawns", "selectdigtarget"],
        ["killat", "selectdigtarget"],
        ["setat", "selectdigtarget", "group", ["ifelse", ["anyat", "knights", "selectdigtarget"], "pawns", "knights"]]
      ],
      runGenerator: "findwinlines",
      link: "endturn"
    }
  },
  generators: {
    findmovetargets: {
      type: "neighbour",
      start: "selectunit",
      condition: ["ifelse", ["anyat", "rooks", "selectunit"],
        ["noneat", "pawns", ["target"]],
        ["ifelse", ["anyat", "pawns", "selectunit"],
          ["noneat", "rooks", ["target"]],
          ["true"]
        ]
      ],
      draw: {
        neighbours: {
          ifover: "neutralunits",
          tolayer: "movetargets"
        }
      }
    },
    finddigtargets: {
      type: "neighbour",
      start: ["turnpos", "movedto"],
      ifover: "neutralunits",
      draw: {
        neighbours: {
          tolayer: "digtargets"
        }
      }
    },
    findwinlines: {
      type: "walker",
      starts: "myunits",
      startasstep: true,
      steps: ["ifelse", ["anyat", "myrooks", ["start"]], "myrooks", ["ifelse", ["anyat", "myknights", ["start"]], "myknights", "mypawns"]],
      draw: {
        steps: {
          condition: ["morethan", ["walklength"], 2],
          tolayer: "winline"
        }
      }
    }
  }
};

export default descentRules;
