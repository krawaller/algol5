import lib from '../logic/';

import { Definition } from './types';
import applyLinkInstructions from './link';
import applyEffectInstructions from './effect';
import {ifCodeContains} from './utils';

export default function addCommandFunction(def: Definition, cmndname: string, player: 1 | 2){
  const O = {rules: def, player, cmndname};
  const cmndDef = def.commands[cmndname];
  const instruction = lib.value(O, cmndDef.instruction||'');
  return `
    game.${cmndname}${player} = function(turn,step){
      var ARTIFACTS = ${lib.copyArtifactsForAction(O,cmndDef)};
      var MARKS = step.MARKS;
      var UNITDATA = Object.assign({},step.UNITDATA);
      ${lib.contains(cmndDef,'spawn') ? 'var clones = step.clones; ' : ''}
      var UNITLAYERS = step.UNITLAYERS;
      ${lib.usesTurnVars(O) ? 'var TURNVARS = Object.assign({},step.TURNVARS); ' : ''}

      ${applyEffectInstructions(def,cmndDef,player)}
      MARKS = {};
      ${lib.calculateUnitLayers(O)}
      ARTIFACTS = ${lib.blankArtifactLayers(O)};
      ${lib.applyGeneratorInstructions(O,cmndDef)}

      var newstepid = step.stepid+'-'+'${cmndname}';
      var newstep = turn.steps[newstepid] = Object.assign({},step,{
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        name: '${O.cmndname}',
        path: step.path.concat('${O.cmndname}')
        ${lib.contains(cmndDef,'spawn') ? ', clones: clones' : ''}
        ${lib.usesTurnVars(O) ? ',TURNVARS: TURNVARS ' : ''}
      });
      turn.links[newstepid] = {};

      ${applyLinkInstructions(def, cmndDef, player, false)}

      return newstep;
    }
    game.${cmndname}${player}instruction = function(step){
      ${ifCodeContains(instruction,{
        MARKS: 'var MARKS = step.MARKS; ',
        ARTIFACTS: 'var ARTIFACTS = step.ARTIFACTS; ',
        UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; ',
        UNITDATA: 'var UNITDATA = step.UNITDATA; ',
      })}
      return ${instruction};
    };
  `;
}