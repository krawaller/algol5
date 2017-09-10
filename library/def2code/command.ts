import lib from '../logic/';

import { Definition } from './types';
import applyLinkInstructions from './link';
import applyEffectInstructions from './effect';
import applyGeneratorInstructions from './generate';
import {
  ifCodeContains,
  usesTurnVars,
  contains,
  blankArtifactLayers,
} from './utils';

import {copyArtifactsForAction, calculateUnitLayers} from './common';

export default function addCommandFunction(def: Definition, cmndname: string, player: 1 | 2){
  const O = {rules: def, player, cmndname};
  const cmndDef = def.commands[cmndname];
  const instruction = lib.value(O, cmndDef.instruction||'');
  return `
    game.${cmndname}${player} = function(turn,step){
      var ARTIFACTS = ${copyArtifactsForAction(def,cmndDef)};
      var MARKS = step.MARKS;
      var UNITDATA = Object.assign({},step.UNITDATA);
      ${contains(cmndDef,'spawn') ? 'var clones = step.clones; ' : ''}
      var UNITLAYERS = step.UNITLAYERS;
      ${usesTurnVars(cmndDef) ? 'var TURNVARS = Object.assign({},step.TURNVARS); ' : ''}

      ${applyEffectInstructions(def,cmndDef,player)}
      MARKS = {};
      ${calculateUnitLayers(def, player, false)}
      ARTIFACTS = ${blankArtifactLayers(def)};
      ${applyGeneratorInstructions(def,cmndDef,player,cmndname)}

      var newstepid = step.stepid+'-'+'${cmndname}';
      var newstep = turn.steps[newstepid] = Object.assign({},step,{
        ARTIFACTS: ARTIFACTS,
        MARKS: MARKS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        stepid: newstepid,
        name: '${O.cmndname}',
        path: step.path.concat('${O.cmndname}')
        ${contains(cmndDef,'spawn') ? ', clones: clones' : ''}
        ${usesTurnVars(cmndDef) ? ',TURNVARS: TURNVARS ' : ''}
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