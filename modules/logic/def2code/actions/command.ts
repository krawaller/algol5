import { FullDef } from "../types";
import applyLinkInstructions from "./link";
import applyEffectInstructions from "./effect";
import applyGeneratorInstructions from "../artifacts/generate";
import makeParser from "../expressions";
import {
  ifCodeContains,
  usesTurnVars,
  usesBattleVars,
  contains,
  blankArtifactLayers,
  possibilities
} from "../utils";

import { copyArtifactsForAction, calculateUnitLayers } from "../common";

export default function addCommandFunction(
  def: FullDef,
  player: 1 | 2,
  cmndname: string
) {
  const expr = makeParser(def, player, cmndname);
  const cmndDef = def.flow.commands[cmndname];
  const instruction = expr.content(def.instructions[cmndname] || "");

  const deadEnd = (cmndDef.links || []).concat(cmndDef.link || []).reduce((list, l) => list.concat(possibilities(l)), []).filter(l => l !== 'endturn').length === 0;

  return `
    game.${cmndname}${player} = function(turn,step){
      let ARTIFACTS = step.ARTIFACTS;
      let MARKS = step.MARKS;
      let UNITDATA = Object.assign({},step.UNITDATA);
      ${
        contains(cmndDef, "spawn") || contains(cmndDef, "spawnin")
          ? "let clones = step.clones; "
          : ""
      }
      let UNITLAYERS = step.UNITLAYERS;
      ${
        usesTurnVars(cmndDef)
          ? "let TURNVARS = Object.assign({},step.TURNVARS); "
          : ""
      }
      ${
        usesBattleVars(cmndDef)
          ? "let BATTLEVARS = Object.assign({},step.BATTLEVARS); "
          : ""
      }

      ${applyEffectInstructions(def, player, cmndname, cmndDef)}
      MARKS = {};
      ${calculateUnitLayers(def, player, false)}
      ${applyGeneratorInstructions(def, player, cmndname, cmndDef)}

      let newstepid = step.stepid+'-'+'${cmndname}';
      let newstep = turn.steps[newstepid] = Object.assign({},step,{
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        name: '${cmndname}',
        path: step.path.concat('${cmndname}')
        ${
          contains(cmndDef, "spawn") || contains(cmndDef, "spawnin")
            ? ", clones: clones"
            : ""
        }
        ${usesTurnVars(cmndDef) ? ",TURNVARS: TURNVARS " : ""}
        ${usesBattleVars(cmndDef) ? ",BATTLEVARS: BATTLEVARS " : ""}
      });
      turn.links[newstepid] = {};

      ${applyLinkInstructions(def, player, cmndname, cmndDef, false)}

      return newstep;
    }
    ${deadEnd ? '' : `
    game.${cmndname}${player}instruction = function(turn,step){
      ${ifCodeContains(instruction, {
        MARKS: "let MARKS = step.MARKS; ",
        ARTIFACTS: "let ARTIFACTS = step.ARTIFACTS; ",
        UNITLAYERS: "let UNITLAYERS = step.UNITLAYERS; ",
        UNITDATA: "let UNITDATA = step.UNITDATA; "
      })}
      return ${instruction};
    };
    `}
  `;
}
