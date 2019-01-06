import {Flow} from '../../../types';
import { GogolArtifactLayer, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolUnit } from './_types';

const gogolFlow: Flow<GogolArtifactLayer, GogolCommand, GogolGenerator, GogolLayer, GogolMark, GogolUnit> = {
  startTurn: {
    runGenerators: ["findforbiddenkingspots", "findforbiddensoldierspots"],
    link: ["ifelse", ["morethan", ["turn"], 2], "selectunit", "selectkingdeploy"]
  },
  marks: {
    selectkingdeploy: {
      from: ["subtract", "board", ["union", "units", "nokings"]],
      link: "deploy"
    },
    selectunit: {
      from: "myunits",
      runGenerators: ["findkingwalktargets", "findadjacentenemies", "findjumptargets"],
      links: ["selectmovetarget", "selectjumptarget"]
    },
    selectmovetarget: {
      from: ["ifelse", ["anyat", "mykings", "selectunit"], "kingwalk", ["subtract", "board", ["union", "units", ["union", "nosoldiers", "jumptargets"]]]],
      link: "move"
    },
    selectjumptarget: {
      from: "jumptargets",
      runGenerator: "findsplashed",
      link: "jump"
    }
  },
  commands: {
    deploy: {
      applyEffect: ["spawn", "selectkingdeploy", "kings"],
      link: "endturn"
    },
    move: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      link: "endturn"
    },
    jump: {
      applyEffects: [
        ["killat", ["onlyin", "splashed"]],
        ["moveat", "selectunit", "selectjumptarget"]
      ],
      link: "endturn"
    }
  },
  endGame: {
    infiltration: {
      condition: ["overlaps", "mykings", "opphomerow"]
    },
    kingkill: {
      condition: ["and", ["morethan", ["turn"], 2],
        ["isempty", "oppkings"]
      ]
    }
  }
};

export default gogolFlow;
